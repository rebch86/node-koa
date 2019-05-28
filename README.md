# node-koa project

- koa 프레임워크 구성
- git rm -r --cached .idea
- project start 
```
1. npm install
2. npm run start

<yourIP>:3030/

DB : test
TABLE : user

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `idx` int(11) NOT NULL AUTO_INCREMENT,
  `userId` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `gender` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  `address` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `addressDetail` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `zipCode` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `createDate` datetime(0) DEFAULT NULL,
  PRIMARY KEY (`idx`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

```
2019.04.28 : 초기 구성
node : 10.14.1
npm : 6.9.0

- dependency
dotenv : "^7.0.0"

koa: "^2.7.0"
koa-bodyparser: "^4.2.1"
koa-logger: "^3.2.0"
koa-mount: "^4.0.0"
koa-passport: "^4.1.3"
koa-router: "^7.4.0"
koa-session: "^5.11.0"
koa-static: "^5.0.0"

mysql: ^2.17.1
mysql2: ^1.6.5

passport-jwt: ^4.0.0
passport-local: ^1.0.0

```
