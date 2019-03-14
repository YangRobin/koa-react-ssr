/*
Navicat MySQL Data Transfer

Source Server         : xyxz
Source Server Version : 50643
Source Host           : localhost:3306
Source Database       : xyzy

Target Server Type    : MYSQL
Target Server Version : 50643
File Encoding         : 65001

Date: 2019-03-11 19:56:44
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for article
-- ----------------------------
DROP TABLE IF EXISTS `article`;
CREATE TABLE `article` (
  `id` int(11) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL COMMENT '类型。 文章，视频 ，图片',
  `media_type` varchar(255) DEFAULT NULL,
  `sub_type` varchar(255) DEFAULT NULL,
  `area` varchar(255) DEFAULT NULL COMMENT '领域 。例如： 数学 ，物理学，英语等。',
  `creator` varchar(255) DEFAULT NULL,
  `content` text,
  `create_time` varchar(255) DEFAULT NULL,
  `cover` varchar(255) DEFAULT NULL,
  `gmt_modify` varchar(255) DEFAULT NULL,
  `praise_times` int(11) DEFAULT NULL,
  `discard` smallint(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=116 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of article
-- ----------------------------
INSERT INTO `article` VALUES ('00000000086', '机器学习理论', 'computer', '文章', 'mLearn', null, '1', '<h3>监督学习和非监督学习</h3><pre class=\"ql-syntax\" spellcheck=\"false\">var name =\"robin\"\nsetTimeout(()=&gt;{  ;
INSERT INTO `article` VALUES ('00000000087', '机器学习理论', 'computer', '文章', 'mLearn', null, '1', '<h3>监督学习和非监督学习</h3><pre class=\"ql-syntax\" spellcheck=\"false\">``` javascriptvar \n  name =\"robin\"\n  setTimeout(()=&gt;{  ;
INSERT INTO `article` VALUES ('00000000114', 'light_test', 'computer', '文章', 'webFront', null, '1', '<pre class=\"ql-syntax\" spellcheck=\"false\"><span class=\"hljs-function\"><span class=\"hljs-title\">if</span><span class=\"hljs-params\">(true)</span></span>{   ;
INSERT INTO `article` VALUES ('00000000115', 'sdfsfsdf', '', '', '', null, '1', '<pre class=\"ql-syntax\" spellcheck=\"false\"><span class=\"hljs-function\"><span class=\"hljs-keyword\">function</span> <span class=\"hljs-title\">test</span>()</span>{\n  <span class=\"hljs-keyword\">var</span> name=<span class=\"hljs-string\">\"robi\"</span>\n  <span class=\"hljs-keyword\">this</span>.name=name;\n  <span class=\"hljs-keyword\">if</span>(name === <span class=\"hljs-string\">\"test\"</span>){\n     <span class=\"hljs-built_in\">console</span>.log(<span class=\"hljs-string\">\"dsfds\"</span>);  \n  }\n  <span class=\"hljs-keyword\">const</span> age =<span class=\"hljs-number\">33</span>;\n  <span class=\"hljs-keyword\">new</span> <span class=\"hljs-built_in\">String</span>(<span class=\"hljs-string\">\"\"</span>);\n  \n  <span class=\"hljs-keyword\">return</span> {\n  }\n  ﻿\n}\n</pre>', '2019-03-10T12:43:31.242Z', '', 'undefined', null, '0');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `nick_name` varchar(255) DEFAULT NULL COMMENT '昵称',
  `password` varchar(255) DEFAULT NULL,
  `avator` varchar(255) DEFAULT NULL COMMENT '头像',
  `sex` smallint(255) DEFAULT NULL,
  `phone_number` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `birthday` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1', 'robin', null, 'wocao123', './avator.jpg', null, null, null, null);
SET FOREIGN_KEY_CHECKS=1;
