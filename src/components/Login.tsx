"use client";
import { Form, Input, Button, message } from "antd";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Api } from "@/utils/Api";

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const api = new Api();

  

  const onFinish = async (values: any) => {
    setLoading(true);

    try {
      const payload = {
        email: values.email,
        password: values.password,
      };
      const response = await api.users.login(payload);

      if (!response) {
        throw new Error(response.message || "Something went wrong");
      }

      const expires = new Date();
      expires.setDate(expires.getDate() + 1);
      document.cookie = `${"ACCESS_TOKEN"}=${response._id};expires=${expires.toUTCString()};path=/`;

      message.success("Login successfully");
      router.push("/dashboard");
    } catch (error: any) {
      const errorMessage = error.message || "Something went wrong";
      message.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-green-200">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>
        <Form name="login" onFinish={onFinish} layout="vertical">
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please enter your email" }]}
          >
            <Input placeholder="Enter your email" type="email" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter your password" }]}
          >
            <Input.Password placeholder="Enter your password" />
          </Form.Item>

          
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full"
              loading={loading}
            >
              Login
            </Button>
          </Form.Item>

          <div className="flex justify-between items-center">
            <Link href="/signup">
              <span className="text-blue-500 hover:text-blue-700">
                Switch to Signup
              </span>
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default LoginForm;
