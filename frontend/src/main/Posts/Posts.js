import { Avatar, Table, Button } from "flowbite-react";
import React from "react";
import { Plus } from "react-feather";
import { Link } from "react-router-dom";

export default function Posts() {
  return (
    <div className="container mx-auto my-4">
      <div className="flex flex-wrap items-center gap-2">
        <Avatar
          img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
          rounded={true}
        />
        <span className="font-bold">xinchaocacban@gmail.com</span>
      </div>
      <div className="flex justify-between items-center mt-4">
        <h5 className="font-bold capitalize">
          Danh sách công việc cần tuyển của bạn
        </h5>
        <Link to="/posts/create">
          <a>
            <Button>
              <Plus size={15} className="mr-1" />{" "}
              <span className="text-sm">Thêm</span>
            </Button>
          </a>
        </Link>
      </div>
      <Table className="mt-4">
        <Table.Head>
          <Table.HeadCell>Tên công việc</Table.HeadCell>
          <Table.HeadCell>Hạn nộp hồ sơ</Table.HeadCell>
          <Table.HeadCell>Tình trạng</Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Edit</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900">
              <span className="capitalize">
                tuyển dụng gia sư tiếng anh online tại hà nội
              </span>
            </Table.Cell>
            <Table.Cell>12:00 AM, 17-10-2022</Table.Cell>
            <Table.Cell>Đã hết hạn</Table.Cell>
            <Table.Cell>
              <a
                href="/posts/1"
                className="font-medium text-blue-600 hover:underline dark:text-blue-500 mr-3"
              >
                Sửa
              </a>
              <a
                href="/posts/1"
                className="font-medium text-red-600 hover:underline dark:text-blue-500"
              >
                Xóa
              </a>
            </Table.Cell>
          </Table.Row>
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              <span className="capitalize">
                nhân viên tư vấn trả góp tại thái bình
              </span>
            </Table.Cell>
            <Table.Cell>12:00 AM, 17-10-2022</Table.Cell>
            <Table.Cell>Kích hoạt</Table.Cell>
            <Table.Cell>
              <a
                href="/posts/1"
                className="font-medium text-blue-600 hover:underline dark:text-blue-500 mr-3"
              >
                Sửa
              </a>
              <a
                href="/posts/1"
                className="font-medium text-red-600 hover:underline dark:text-blue-500"
              >
                Xóa
              </a>
            </Table.Cell>
          </Table.Row>
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              <span className="capitalize">
                lái xe lơ xe phụ kho xếp bánh kẹo 650k/ngày
              </span>
            </Table.Cell>
            <Table.Cell>12:00 AM, 17-10-2022</Table.Cell>
            <Table.Cell>Đang xử lý</Table.Cell>
            <Table.Cell>
              <a
                href="/posts/1"
                className="font-medium text-blue-600 hover:underline dark:text-blue-500 mr-3"
              >
                Sửa
              </a>
              <a
                href="/posts/1"
                className="font-medium text-red-600 hover:underline dark:text-blue-500"
              >
                Xóa
              </a>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </div>
  );
}
