# Create a login, register form using React, NodeJS (ExpressJS)

## Công nghệ sử dụng

- Backend: Node.js, Express.js, TypeScript, JWT, MongoDB, Express Validator, ESLint,...
- Frontend: React.js, TypeScript, ShadCnUI, Tailwind CSS, Zod, React Hook Form, Authentication,...

## Các chức năng trong dự án

- Đăng ký
- Đăng nhập
- Đăng xuất
- Authentication với JWT

## Link demo dự án

[Link đến file Youtube](https://www.youtube.com/watch?v=Zw9n3589Exg)

## Cấu trúc dự án

### Client

```tree

|  └── src     : Folder chứa mã nguồn của dự án.
|      ├──  components
|           ├── ui
|               ├── button.jsx - Component Button
|               ├── form.jsx - Component Form
|               ├── input.jsx - Component Input
|               ├── use-toast.jsx - Custom hook cho toast notifications
|      ├──  page
|           ├── Login.jsx - Trang đăng nhập
|           ├── Register.jsx - Trang đăng ký
|           ├── Dashboard.jsx` - Trang dashboard, nơi người dùng được chuyển hướng sau khi đăng nhập thành công
|           ├── Home.jsx` - Trang chủ với các nút điều hướng tới trang đăng nhập và đăng ký
|  ├── package.json
|  └── tsconfig.json
```

### Server

```tree

|  └── src     : Folder chứa mã nguồn của dự án.
|      ├──  constants              : Folder chứa các file khai báo enum, message, http status.
|      ├──  controllers            : Folder chứa các file controller của dự án.
|      ├──  interfaces             : Folder chứa các file interface của dự án.
|      ├──  middlewares            : Folder chứa các file middleware của dự án.
|      ├──  models                 : Folder chứa các file model của dự án.
|      ├──  routes                 : Folder chứa các file route của dự án.
|      ├──  services               : Folder chứa các file service của dự án.
|      ├──  utils                  : Folder chứa các hàm có thể tái sử dụng nhiều lần.
|  ├── .env
|  ├── package.json
|  └── tsconfig.json
```

## Cài đặt dự án

1. Clone dự án

```bash
   git clone https://github.com/giang1412/FileStringTest.git
```

2. Di chuyển vào thư mục server

```bash
   cd server
```

3. Cài đặt dependencies

```bash
   npm install
```

4. Chạy dự án

```bash
   npm run dev
```

> Server sẽ được chạy dưới port `http://localhost:4000`

5. Quay trở lại thư mục gốc

```bash
   cd ..
```

6. Di chuyển vào thư mục client

```bash
   cd  client
```

7. Cài đặt dependencies

```bash
   npm install
```

8. Chạy dự án

```bash
   npm run dev
```

> Client sẽ được chạy dưới port `http://localhost:3000`

## API trả về

### Login: `http://localhost:4000/auth/login`

Method: POST
body

```json
{
  "email": "g1@gmail.com",
  "password": "123123"
}
```

Rules

- email: required, length: 5-160, isEmail
- password: required, length: 6-160

Response

```json
{
  "message": "Login success",
  "result": {
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjYzYjI0YmY5MTNmYTczYmNiOWI1NDg4Iiwicm9sZXMiOjIsInRva2VuX3R5cGUiOjAsInZlcmlmeSI6MCwiaWF0IjoxNzE1MTU2ODQ3LCJleHAiOjE3MTUxNTc3NDd9.hQphQ0mu7KWx1sWTL-cMTDDUKrKMRP6SnKUrkMaqLaM",
    "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjYzYjI0YmY5MTNmYTczYmNiOWI1NDg4Iiwicm9sZXMiOjIsInRva2VuX3R5cGUiOjAsInZlcmlmeSI6MCwiaWF0IjoxNzE1MTU2ODQ3LCJleHAiOjE3MTUxNTc3NDd9.hQphQ0mu7KWx1sWTL-cMTDDUKrKMRP6SnKUrkMaqLaM"
  }
}
```

### Login: `http://localhost:4000/auth/register`

Method: POST
body

```json
{
  "email": "g1@gmail.com",
  "password": "123123",
  "confirm_password": "123123"
}
```

Rules

- email: required, length: 5-160, isEmail, unique
- password: required, length: 6-160
- confirm_password: required length: 6-160

Response

```json
{
  "message": "Register success"
}
```

### Logout: `http://localhost:4000/auth/logout`

Method: POST
body

```json
{
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjYzYjI0YmY5MTNmYTczYmNiOWI1NDg4Iiwicm9sZXMiOjIsInRva2VuX3R5cGUiOjEsInZlcmlmeSI6MCwiZXhwIjoxNzIzNzkyMDgxLCJpYXQiOjE3MTUxNTIxMjB9.MF8ip_8xf99CcNGn1ZkOS8JuNKo1lfjoTIEy87XdSp4"
}
```

header authorization

```json
"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjYzYjI0YmY5MTNmYTczYmNiOWI1NDg4Iiwicm9sZXMiOjIsInRva2VuX3R5cGUiOjEsInZlcmlmeSI6MCwiZXhwIjoxNzIzNzkyMDgxLCJpYXQiOjE3MTUxNTIxMjB9.MF8ip_8xf99CcNGn1ZkOS8JuNKo1lfjoTIEy87XdSp"
```

Rules

- refresh_token: required
- authorization: required

Response

```json
{
  "message": "Logout success"
}
```

### Refresh Token: `http://localhost:4000/auth/refresh-token`

Method: POST
body

```json
{
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjYzYjI0YmY5MTNmYTczYmNiOWI1NDg4Iiwicm9sZXMiOjIsInRva2VuX3R5cGUiOjEsInZlcmlmeSI6MCwiZXhwIjoxNzIzNzkyMDgxLCJpYXQiOjE3MTUxNTIxMjB9.MF8ip_8xf99CcNGn1ZkOS8JuNKo1lfjoTIEy87XdSp4"
}
```

Rules

- refresh_token: required

Response

```json
{
  "message": "Refresh token success",
  "result": {
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjYzYjI0YmY5MTNmYTczYmNiOWI1NDg4Iiwicm9sZXMiOjIsInRva2VuX3R5cGUiOjAsInZlcmlmeSI6MCwiaWF0IjoxNzE1MTUyMTUyLCJleHAiOjE3MTUxNTMwNTJ9.nqJDobLTYQ6BVRb_GxmuKkm4LY9fv6CDt9sE1X_gzak",
    "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjYzYjI0YmY5MTNmYTczYmNiOWI1NDg4Iiwicm9sZXMiOjIsInRva2VuX3R5cGUiOjEsInZlcmlmeSI6MCwiZXhwIjoxNzIzNzkyMDgxLCJpYXQiOjE3MTUxNTIxNTJ9.gm-Oca6pcL0WWqff2AFRpR5leP7jKsaBZLynTyp-tdE"
  }
}
```
