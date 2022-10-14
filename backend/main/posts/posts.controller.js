const { sendResponseSuccess } = require("../../core/commonFuncs");
const UsersModel = require("../users/users.model");
const PostsModel = require("./posts.model");
const sendEmail = require("../../core/nodemailer");

const { APP_LIMIT_DEFAULT_LIMIT } = process.env;

/* Posts */

const getPost = async (req, res) => {
  const { id } = req.params;
  const item = await PostsModel.findById(id).populate("User_Ref");
  return sendResponseSuccess(res, { results: { data: item } });
};

const getPosts = async (req, res) => {
  const { ids } = req.params;
  const {
    search: defaultSearch = {},
    page: defaultPage,
    pageSize: defaultPageSize,
    order = "desc",
    orderby = "updated_at",
    loadAll = false,
    loadMore = false,
  } = req.query;

  const page = Number(defaultPage) || 1;
  const pageSize = Number(defaultPageSize) || Number(APP_LIMIT_DEFAULT_LIMIT);

  let pagination = {};

  if (loadAll) {
    pagination = {};
  } else if (loadMore) {
    pagination = {
      limit: pageSize * page,
    };
  } else {
    pagination = {
      skip: pageSize * (page - 1),
      limit: pageSize,
    };
  }

  const search = {
    ...(ids ? { _id: { $in: ids } } : {}),
    ...defaultSearch,
  };

  const items = await PostsModel.find(
    search,
    {},
    { ...pagination, sort: { [orderby]: order } }
  ).populate("User_Ref");
  const total = await PostsModel.countDocuments(search);

  const pageTotal = Math.ceil(total / pageSize);
  const nextPage = page >= pageTotal ? null : page + 1;
  const previousPage = page <= 1 ? null : page - 1;

  const data = {
    items,
    pagination: loadAll
      ? null
      : {
          total,
          page,
          pageSize,
          pageTotal,
          nextPage,
          previousPage,
        },
  };

  return sendResponseSuccess(res, { results: { data } });
};

const createPost = async (req, res) => {
  const user = req.user;

  const created = await PostsModel.create({
    ...req.body,
    User_Ref: user._id,
  });

  const findUser = await UsersModel.findById(user._id);
  await findUser.updateOne({ $push: { Posts_Ref: created._id } });

  sendEmail(
    findUser.Email,
    "Đăng bài thành công | React Recruit.",
    `Thông tin tuyển dụng của bạn đã được tiếp nhận.
    <br />
    Bài viết của bạn sẽ được duyệt trong thời gian sớm nhất...
    <br />
    <h3>${created.Title}</h3>.
    `
  );

  const usersAdmin = await UsersModel.find({ Role: "admin" });
  Promise.all(
    usersAdmin.map((item) =>
      sendEmail(
        findUser.Email,
        "Thông tin tuyển dụng mới | React Recruit.",
        `Thông tin mới trên trang.
        <br />
        Vui lòng nhấp vào đường link để xem thông tin tuyển dụng...
        <br />
        <h3>${created.Title}</h3>.
        Thông tin: http://localhost:3000/posts/view/${created._id}.
        `
      )
    )
  );

  return sendResponseSuccess(res, {
    results: {
      data: created,
      insertId: created._id,
      rowsAffected: created ? 1 : 0,
    },
  });
};

const updatePost = async (req, res) => {
  const { id } = req.params;
  const updated = await PostsModel.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  return sendResponseSuccess(res, {
    results: {
      data: updated,
      rowsAffected: updated ? 1 : 0,
    },
  });
};

module.exports = { getPost, getPosts, createPost, updatePost };
