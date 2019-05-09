/*
 Navicat Premium Data Transfer

 Source Server         : NguyenDat
 Source Server Type    : MySQL
 Source Server Version : 50714
 Source Host           : localhost:3306
 Source Schema         : newsmanagement2

 Target Server Type    : MySQL
 Target Server Version : 50714
 File Encoding         : 65001

 Date: 09/05/2019 16:44:04
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for account
-- ----------------------------
DROP TABLE IF EXISTS `account`;
CREATE TABLE `account`  (
  `AccID` int(11) NOT NULL AUTO_INCREMENT,
  `RoleID` int(11) NULL DEFAULT NULL,
  `Username` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `Password` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `AccIsActive` tinyint(11) NULL DEFAULT NULL,
  `AccCreatedOn` datetime(6) NULL DEFAULT NULL,
  `VerifyID` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`AccID`) USING BTREE,
  UNIQUE INDEX `pk_account`(`AccID`) USING BTREE,
  INDEX `fk_account_role`(`RoleID`) USING BTREE,
  INDEX `Username`(`Username`) USING BTREE,
  CONSTRAINT `fk_account_role` FOREIGN KEY (`RoleID`) REFERENCES `role` (`RoleID`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE = InnoDB AUTO_INCREMENT = 12 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for article
-- ----------------------------
DROP TABLE IF EXISTS `article`;
CREATE TABLE `article`  (
  `ArtID` int(11) NOT NULL AUTO_INCREMENT,
  `ArtTitle` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `SubCatID` int(11) NULL DEFAULT NULL,
  `Summary` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `Content` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `ArtAvatar` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `StatusID` int(11) NULL DEFAULT NULL,
  `RankID` int(11) NULL DEFAULT NULL,
  `ArtCreatedOn` datetime(6) NULL DEFAULT NULL,
  `ArtPostOn` datetime(6) NULL DEFAULT NULL,
  `Views` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `Featured` int(11) NULL DEFAULT NULL,
  `WriterID` int(11) NULL DEFAULT NULL,
  `EditorID` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`ArtID`) USING BTREE,
  UNIQUE INDEX `pk_article`(`ArtID`) USING BTREE,
  INDEX `fk_article_subcategories`(`SubCatID`) USING BTREE,
  INDEX `fk_article_status`(`StatusID`) USING BTREE,
  INDEX `fk_article_rank`(`RankID`) USING BTREE,
  CONSTRAINT `fk_article_rank` FOREIGN KEY (`RankID`) REFERENCES `rank` (`RankID`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `fk_article_status` FOREIGN KEY (`StatusID`) REFERENCES `status` (`StatusID`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `fk_article_subcategories` FOREIGN KEY (`SubCatID`) REFERENCES `subcategories` (`SubCatID`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE = InnoDB AUTO_INCREMENT = 10 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of article
-- ----------------------------
INSERT INTO `article` VALUES (9, NULL, NULL, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

-- ----------------------------
-- Table structure for articlesimages
-- ----------------------------
DROP TABLE IF EXISTS `articlesimages`;
CREATE TABLE `articlesimages`  (
  `ArtImgID` int(11) NOT NULL AUTO_INCREMENT,
  `ArtID` int(11) NULL DEFAULT NULL,
  `Path` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `ImageTitle` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  PRIMARY KEY (`ArtImgID`) USING BTREE,
  UNIQUE INDEX `pk_articlesimages`(`ArtImgID`) USING BTREE,
  INDEX `fk_articleimages_article`(`ArtID`) USING BTREE,
  CONSTRAINT `fk_articleimages_article` FOREIGN KEY (`ArtID`) REFERENCES `article` (`ArtID`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE = InnoDB AUTO_INCREMENT = 9 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for articlestag
-- ----------------------------
DROP TABLE IF EXISTS `articlestag`;
CREATE TABLE `articlestag`  (
  `TagID` int(11) NOT NULL,
  `ArtID` int(11) NOT NULL,
  PRIMARY KEY (`TagID`, `ArtID`) USING BTREE,
  UNIQUE INDEX `pk_articlestag`(`TagID`) USING BTREE,
  UNIQUE INDEX `pk_articlestag1`(`ArtID`) USING BTREE,
  CONSTRAINT `pk_articletag_article` FOREIGN KEY (`ArtID`) REFERENCES `article` (`ArtID`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `pk_articletag_tag` FOREIGN KEY (`TagID`) REFERENCES `tag` (`TagID`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE = InnoDB CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for articlesyoutube
-- ----------------------------
DROP TABLE IF EXISTS `articlesyoutube`;
CREATE TABLE `articlesyoutube`  (
  `ArtID` int(11) NOT NULL,
  `YoutubeID` int(11) NOT NULL,
  PRIMARY KEY (`ArtID`, `YoutubeID`) USING BTREE,
  UNIQUE INDEX `pk_articlesyoutube`(`ArtID`) USING BTREE,
  UNIQUE INDEX `pk_articlesyoutube1`(`YoutubeID`) USING BTREE,
  CONSTRAINT `fk_articlesyoutube_article` FOREIGN KEY (`ArtID`) REFERENCES `article` (`ArtID`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `fk_articlesyoutube_youtube` FOREIGN KEY (`YoutubeID`) REFERENCES `youtube` (`YoutubeID`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE = InnoDB CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for category
-- ----------------------------
DROP TABLE IF EXISTS `category`;
CREATE TABLE `category`  (
  `CatID` int(11) NOT NULL AUTO_INCREMENT,
  `CatName` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `CatIsActive` tinyint(11) NULL DEFAULT NULL,
  PRIMARY KEY (`CatID`) USING BTREE,
  UNIQUE INDEX `pk_category`(`CatID`) USING BTREE,
  UNIQUE INDEX `uk_catname`(`CatName`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 13 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of category
-- ----------------------------
INSERT INTO `category` VALUES (1, 'Thời sự', 1);
INSERT INTO `category` VALUES (2, 'Pháp luật', 1);
INSERT INTO `category` VALUES (3, 'Thế giới', 1);
INSERT INTO `category` VALUES (4, 'Kinh doanh', 1);
INSERT INTO `category` VALUES (5, 'Công nghệ', 1);
INSERT INTO `category` VALUES (6, 'Thể thao', 1);
INSERT INTO `category` VALUES (7, 'Âm nhạc', 1);
INSERT INTO `category` VALUES (8, 'Phim ảnh', 1);
INSERT INTO `category` VALUES (9, 'Thời trang', 1);
INSERT INTO `category` VALUES (10, 'Du lịch', 1);
INSERT INTO `category` VALUES (11, 'Sức khỏe', 1);
INSERT INTO `category` VALUES (12, 'Giáo dục', 1);

-- ----------------------------
-- Table structure for comment
-- ----------------------------
DROP TABLE IF EXISTS `comment`;
CREATE TABLE `comment`  (
  `CommentID` int(11) NOT NULL AUTO_INCREMENT,
  `ArtID` int(11) NULL DEFAULT NULL,
  `SubscriberID` int(11) NULL DEFAULT NULL,
  `Content` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL,
  `CommentCreatedOn` datetime(6) NULL DEFAULT NULL,
  `Likes` int(11) NULL DEFAULT NULL,
  `Dislikes` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`CommentID`) USING BTREE,
  UNIQUE INDEX `pk_comment`(`CommentID`) USING BTREE,
  INDEX `fk_comment_article`(`ArtID`) USING BTREE,
  INDEX `fk_comment_subscriber`(`SubscriberID`) USING BTREE,
  CONSTRAINT `fk_comment_article` FOREIGN KEY (`ArtID`) REFERENCES `article` (`ArtID`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `fk_comment_subscriber` FOREIGN KEY (`SubscriberID`) REFERENCES `subscriber` (`SubscriberID`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for editor
-- ----------------------------
DROP TABLE IF EXISTS `editor`;
CREATE TABLE `editor`  (
  `EditorID` int(11) NOT NULL AUTO_INCREMENT,
  `AccID` int(11) NULL DEFAULT NULL,
  `Fullname` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `Avatar` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL,
  `DOB` date NULL DEFAULT NULL,
  PRIMARY KEY (`EditorID`) USING BTREE,
  UNIQUE INDEX `pk_editor`(`EditorID`) USING BTREE,
  INDEX `fk_editor_account`(`AccID`) USING BTREE,
  CONSTRAINT `fk_editor_account` FOREIGN KEY (`AccID`) REFERENCES `account` (`AccID`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for rank
-- ----------------------------
DROP TABLE IF EXISTS `rank`;
CREATE TABLE `rank`  (
  `RankID` int(11) NOT NULL AUTO_INCREMENT,
  `RankName` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  PRIMARY KEY (`RankID`) USING BTREE,
  UNIQUE INDEX `pk_rank`(`RankID`) USING BTREE,
  UNIQUE INDEX `uk_rankname`(`RankName`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of rank
-- ----------------------------
INSERT INTO `rank` VALUES (1, 'Normal');
INSERT INTO `rank` VALUES (2, 'Premium');

-- ----------------------------
-- Table structure for role
-- ----------------------------
DROP TABLE IF EXISTS `role`;
CREATE TABLE `role`  (
  `RoleID` int(11) NOT NULL AUTO_INCREMENT,
  `RoleName` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  PRIMARY KEY (`RoleID`) USING BTREE,
  UNIQUE INDEX `pk_role`(`RoleID`) USING BTREE,
  UNIQUE INDEX `uk_rolename`(`RoleName`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of role
-- ----------------------------
INSERT INTO `role` VALUES (4, 'Admin');
INSERT INTO `role` VALUES (3, 'Editor');
INSERT INTO `role` VALUES (1, 'Subscriber');
INSERT INTO `role` VALUES (2, 'Writer');

-- ----------------------------
-- Table structure for status
-- ----------------------------
DROP TABLE IF EXISTS `status`;
CREATE TABLE `status`  (
  `StatusID` int(11) NOT NULL AUTO_INCREMENT,
  `StatusName` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  PRIMARY KEY (`StatusID`) USING BTREE,
  UNIQUE INDEX `pk_status`(`StatusID`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for subcategories
-- ----------------------------
DROP TABLE IF EXISTS `subcategories`;
CREATE TABLE `subcategories`  (
  `SubCatID` int(11) NOT NULL AUTO_INCREMENT,
  `SubCatName` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `CatID` int(11) NULL DEFAULT NULL,
  `SubCatIsActive` tinyint(11) NULL DEFAULT NULL,
  PRIMARY KEY (`SubCatID`) USING BTREE,
  UNIQUE INDEX `pk_subcategories`(`SubCatID`) USING BTREE,
  INDEX `fk_subcategories_category`(`CatID`) USING BTREE,
  UNIQUE INDEX `uk_subcatname`(`SubCatName`) USING BTREE,
  CONSTRAINT `fk_subcategories_category` FOREIGN KEY (`CatID`) REFERENCES `category` (`CatID`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE = InnoDB AUTO_INCREMENT = 31 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of subcategories
-- ----------------------------
INSERT INTO `subcategories` VALUES (1, 'Chính trị', 1, 1);
INSERT INTO `subcategories` VALUES (2, 'Giao thông', 1, 1);
INSERT INTO `subcategories` VALUES (3, 'Pháp đình', 2, 1);
INSERT INTO `subcategories` VALUES (4, 'Vụ án', 2, 1);
INSERT INTO `subcategories` VALUES (5, 'Quân sự', 3, 1);
INSERT INTO `subcategories` VALUES (6, 'Người Việt 4 phương', 3, 1);
INSERT INTO `subcategories` VALUES (7, 'Tư liệu', 3, 1);
INSERT INTO `subcategories` VALUES (8, 'Bất động sản', 4, 1);
INSERT INTO `subcategories` VALUES (9, 'Hàng không', 4, 1);
INSERT INTO `subcategories` VALUES (10, 'Doanh nhân', 4, 1);
INSERT INTO `subcategories` VALUES (11, 'Mobile', 5, 1);
INSERT INTO `subcategories` VALUES (12, 'Internet', 5, 1);
INSERT INTO `subcategories` VALUES (13, 'Thể thao Việt Nam', 6, 1);
INSERT INTO `subcategories` VALUES (14, 'Thể thao Thế giới', 6, 1);
INSERT INTO `subcategories` VALUES (15, 'Hậu trường thể thao', 6, 1);
INSERT INTO `subcategories` VALUES (16, 'Nhạc Việt', 7, 1);
INSERT INTO `subcategories` VALUES (17, 'Nhạc Âu Mỹ', 7, 1);
INSERT INTO `subcategories` VALUES (18, 'Nhạc Hàn', 7, 1);
INSERT INTO `subcategories` VALUES (19, 'Phim chiếu rạp', 8, 1);
INSERT INTO `subcategories` VALUES (20, 'Phim truyền hình', 8, 1);
INSERT INTO `subcategories` VALUES (21, 'Thời trang sao', 9, 1);
INSERT INTO `subcategories` VALUES (22, 'Mặc đẹp', 9, 1);
INSERT INTO `subcategories` VALUES (23, 'Làm đẹp', 9, 1);
INSERT INTO `subcategories` VALUES (24, 'Địa điểm du lịch', 10, 1);
INSERT INTO `subcategories` VALUES (25, 'Kinh nghiệm du lịch', 10, 1);
INSERT INTO `subcategories` VALUES (26, 'Phượt', 10, 1);
INSERT INTO `subcategories` VALUES (27, 'Khỏe đẹp', 11, 1);
INSERT INTO `subcategories` VALUES (28, 'Dinh dưỡng', 11, 1);
INSERT INTO `subcategories` VALUES (29, 'Tư vấn', 12, 1);
INSERT INTO `subcategories` VALUES (30, 'Học Tiếng Anh', 12, 1);

-- ----------------------------
-- Table structure for subscriber
-- ----------------------------
DROP TABLE IF EXISTS `subscriber`;
CREATE TABLE `subscriber`  (
  `SubscriberID` int(11) NOT NULL AUTO_INCREMENT,
  `AccID` int(11) NULL DEFAULT NULL,
  `Fullname` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `DOB` date NULL DEFAULT NULL,
  `BoughtOn` datetime(6) NULL DEFAULT NULL,
  `ExpriedOn` datetime(6) NULL DEFAULT NULL,
  PRIMARY KEY (`SubscriberID`) USING BTREE,
  UNIQUE INDEX `pk_subscriber`(`SubscriberID`) USING BTREE,
  INDEX `fk_subscriber_account`(`AccID`) USING BTREE,
  CONSTRAINT `subscriber_ibfk_1` FOREIGN KEY (`AccID`) REFERENCES `account` (`AccID`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for tag
-- ----------------------------
DROP TABLE IF EXISTS `tag`;
CREATE TABLE `tag`  (
  `TagID` int(11) NOT NULL AUTO_INCREMENT,
  `TagName` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  PRIMARY KEY (`TagID`) USING BTREE,
  UNIQUE INDEX `pk_tag`(`TagID`) USING BTREE,
  UNIQUE INDEX `uk_tagname`(`TagName`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for writer
-- ----------------------------
DROP TABLE IF EXISTS `writer`;
CREATE TABLE `writer`  (
  `WriterID` int(11) NOT NULL AUTO_INCREMENT,
  `Pseudonym` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL,
  `Fullname` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `Avatar` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL,
  `DOB` date NULL DEFAULT NULL,
  `AccID` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`WriterID`) USING BTREE,
  UNIQUE INDEX `pk_writer`(`WriterID`) USING BTREE,
  INDEX `fk_writer_account`(`AccID`) USING BTREE,
  CONSTRAINT `fk_writer_account` FOREIGN KEY (`AccID`) REFERENCES `account` (`AccID`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for youtube
-- ----------------------------
DROP TABLE IF EXISTS `youtube`;
CREATE TABLE `youtube`  (
  `YoutubeID` int(11) NOT NULL AUTO_INCREMENT,
  `Link` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL,
  `YoutubeTitle` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL,
  PRIMARY KEY (`YoutubeID`) USING BTREE,
  UNIQUE INDEX `pk_youtube`(`YoutubeID`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

SET FOREIGN_KEY_CHECKS = 1;
