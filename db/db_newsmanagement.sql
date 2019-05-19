/*
 Navicat Premium Data Transfer

 Source Server         : WAMP_MYSQL
 Source Server Type    : MySQL
 Source Server Version : 50723
 Source Host           : localhost:3306
 Source Schema         : db_newsmanagement

 Target Server Type    : MySQL
 Target Server Version : 50723
 File Encoding         : 65001

 Date: 19/05/2019 15:52:27
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for account
-- ----------------------------
DROP TABLE IF EXISTS `account`;
CREATE TABLE `account`  (
  `AccID` int(11) NOT NULL AUTO_INCREMENT,
  `RoleID` int(11) DEFAULT NULL,
  `Username` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `Password` text CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  `AccIsActive` tinyint(1) DEFAULT NULL,
  `AccCreatedOn` datetime(0) DEFAULT NULL,
  `VerifyID` int(11) DEFAULT NULL,
  PRIMARY KEY (`AccID`) USING BTREE,
  INDEX `fk_account_role1`(`RoleID`) USING BTREE,
  CONSTRAINT `fk_account_role1` FOREIGN KEY (`RoleID`) REFERENCES `role` (`RoleID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of account
-- ----------------------------
INSERT INTO `account` VALUES (2, 2, 'tthongdao1998@gmail.com', '$2b$10$voUeCgY9e3.yUoAF2E7b.eT.JfynHIU1SLxIi2ejwUfJfHTangfl.', 0, '2019-05-11 20:57:38', NULL);
INSERT INTO `account` VALUES (3, 1, 'tthongdao1997@gmail.com', '$2b$10$voUeCgY9e3.yUoAF2E7b.eT.JfynHIU1SLxIi2ejwUfJfHTangfl.', 0, '2019-05-11 21:14:57', 691279);
INSERT INTO `account` VALUES (4, 1, 'tandatng163@gmail.com', '$2b$10$vinb5MdsA6j2tgVNNYgqw.JYXLntfVz.0AjTLRN8OLS76aPH7FCcW', 0, '2019-05-11 21:33:29', 212877);

-- ----------------------------
-- Table structure for article
-- ----------------------------
DROP TABLE IF EXISTS `article`;
CREATE TABLE `article`  (
  `ArtID` int(11) NOT NULL AUTO_INCREMENT,
  `CatID` int(11) DEFAULT NULL,
  `SubCatID` int(11) DEFAULT NULL,
  `ArtTitle` text CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  `ArtAvatar` text CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  `Summary` text CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  `Content` text CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  `StatusID` int(11) DEFAULT NULL,
  `RankID` int(11) DEFAULT NULL,
  `ArtCreatedOn` datetime(0) DEFAULT NULL,
  `ArtPostedOn` datetime(0) DEFAULT NULL,
  `Views` int(255) DEFAULT NULL,
  `Featured` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `WriterID` int(11) DEFAULT NULL,
  `EditorID` int(11) DEFAULT NULL,
  PRIMARY KEY (`ArtID`) USING BTREE,
  INDEX `fk_art_cat1`(`CatID`) USING BTREE,
  INDEX `fk_art_subcat1`(`SubCatID`) USING BTREE,
  INDEX `fk_art_status1`(`StatusID`) USING BTREE,
  INDEX `fk_art_rank1`(`RankID`) USING BTREE,
  INDEX `fk_art_writer1`(`WriterID`) USING BTREE,
  INDEX `fk_art_editor1`(`EditorID`) USING BTREE,
  CONSTRAINT `fk_art_cat1` FOREIGN KEY (`CatID`) REFERENCES `category` (`CatID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_art_editor1` FOREIGN KEY (`EditorID`) REFERENCES `editor` (`EditorID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_art_rank1` FOREIGN KEY (`RankID`) REFERENCES `rank` (`RankID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_art_status1` FOREIGN KEY (`StatusID`) REFERENCES `status` (`StatusID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_art_subcat1` FOREIGN KEY (`SubCatID`) REFERENCES `subcategories` (`SubCatID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_art_writer1` FOREIGN KEY (`WriterID`) REFERENCES `writer` (`WriterID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 24 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of article
-- ----------------------------
INSERT INTO `article` VALUES (15, NULL, NULL, 'Thú cưng', NULL, 'Giari pháp nuôi thú với người ở căn hộ', '<p><img alt=\"\" src=\"/upload/1512794747.jpg\" style=\"height:720px; width:1280px\" />Vật nu&ocirc;i ch&iacute;nh chủ</p>\r\n', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `article` VALUES (16, NULL, NULL, 'Sự huyền bí của Phố Cổ Hội An về Đêm', NULL, 'Khi có dịp đến du lịch Đà Nẵng bạn đừng quên và bỏ lỡ cơ hội ngắm nhìn Phố cổ Hội An về đêm không đây là một cơ hội nhìn trực tiếp vẻ đẹp lạ lùng của ánh đèn lồng được khắp các con đường đi đâu cũng nhìn thấy đèn lồng với nhiều kiểu mẫu và màu sắc khác nhau tạo nên một không gian sáng lạng rực rỡ.', '<p><img alt=\"\" src=\"/upload/9378364503.png\" style=\"float:left; height:397px; width:768px\" /></p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p><span style=\"background-color:#ffffff; color:#333333; font-family:Arial,Helvetica,sans-serif; font-size:14px\">Khi c&oacute; dịp đến&nbsp;</span><a href=\"http://dulichdanangvn.com/\" style=\"color: rgb(4, 68, 118); text-decoration: none; outline: none !important; transition: all 0.2s ease-in-out 0s; transform: translateZ(0px); font-family: Arial, Helvetica, sans-serif; font-size: 14px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: justify; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255);\"><strong>du lịch Đ&agrave; Nẵng</strong></a><span style=\"background-color:#ffffff; color:#333333; font-family:Arial,Helvetica,sans-serif; font-size:14px\">&nbsp;bạn đừng qu&ecirc;n v&agrave; bỏ lỡ cơ hội ngắm nh&igrave;n Phố cổ Hội An về đ&ecirc;m kh&ocirc;ng đ&acirc;y l&agrave; một cơ hội nh&igrave;n trực tiếp vẻ đẹp lạ&nbsp;l&ugrave;ng của &aacute;nh đ&egrave;n lồng được&nbsp;khắp c&aacute;c con đường đi đ&acirc;u cũng nh&igrave;n thấy đ&egrave;n lồng với nhiều kiểu mẫu v&agrave; m&agrave;u sắc kh&aacute;c nhau tạo n&ecirc;n một kh&ocirc;ng gian s&aacute;ng lạng&nbsp;rực rỡ.</span></p>\r\n\r\n<p><span style=\"background-color:#ffffff; color:#333333; font-family:Arial,Helvetica,sans-serif; font-size:14px\">Đ&agrave; bao du kh&aacute;ch&nbsp;</span><strong>du lịch Đ&agrave; Nẵng</strong><span style=\"background-color:#ffffff; color:#333333; font-family:Arial,Helvetica,sans-serif; font-size:14px\">&nbsp;t&ograve; m&ograve; về xuất xứ của những chiếc đ&egrave;n lồng n&agrave;, nhưng thực sự nguồn gốc của những chiếc đ&egrave;n lồng n&agrave;y rất kh&oacute; để chứng minh được c&oacute; lẽ n&oacute; đ&atilde; c&oacute; từ rất rất l&acirc;u. &nbsp;Khi đến đ&acirc;y tất cả như trở về với qu&ecirc; cha đất tổ.&nbsp;Từ những chiếc đ&egrave;n đầu l&acirc;n, đầu rồng trong c&aacute;c lễ hội của một người Hoa c&oacute; t&ecirc;n X&atilde; Đường, nghề l&agrave;m lồng đ&egrave;n tại . Hội An đ&atilde; được&nbsp;UNESCO c&ocirc;ng nhận l&agrave; di sản văn h&oacute;a th&eacute; giới v&agrave; l&agrave; điểm đến&nbsp;du lịch cho du kh&aacute;ch.</span></p>\r\n\r\n<p><img alt=\"\" src=\"/upload/5509918504.jpg\" style=\"height:375px; width:636px\" /></p>\r\n\r\n<p><span style=\"background-color:#ffffff; color:#333333; font-family:Arial,Helvetica,sans-serif; font-size:14px\">V&agrave;o những ng&agrave;y rằm phố cổ rực rỡ hơn một kh&ocirc;ng gian mang đậm chất&nbsp;&nbsp;Đ&ocirc;ng phương, b&iacute; ẩn được suất hiện ở mọi nơi&nbsp;từ những m&aacute;i hi&ecirc;n, những ban c&ocirc;ng gỗ, khung cửa sổ hay một con hẻm. Khiến con người ta trở nền huyền ảo v&agrave; t&ograve; m&ograve; về điều g&igrave; đ&oacute;. Cảm nhận trong con người l&uacute;c đ&oacute; chắc rằng chỉ muốn h&ograve;a m&igrave;nh v&agrave;o luồng s&aacute;ng để kh&aacute;m ph&aacute; thứ kỳ diệu ẩn chứa nơi đ&acirc;y.&nbsp;</span></p>\r\n', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `article` VALUES (17, NULL, NULL, 'Bác sĩ nói về công nghệ chăm sóc da chuyên sâu nổi bật hiện nay', NULL, 'Sau trải nghiệm công nghệ HydraFacial, gương mặt sẽ săn chắc, sáng hơn và tình trạng giữ nước dưới da cũng được cải thiện…', '<p>L&agrave;n da l&atilde;o h&oacute;a khiến mọi người gi&agrave; hơn tuổi v&agrave; thiếu sức sống, l&agrave;m thể n&agrave;o để chăm s&oacute;c, bảo dưỡng da l&agrave; vấn đề được nhiều người quan t&acirc;m.&nbsp; Tiến sĩ, b&aacute;c sĩ Trần Thị Anh T&uacute; - Gi&aacute;m đốc Thẩm mỹ viện B&aacute;c sĩ T&uacute; (TP HCM) với gần 30 năm kinh nghiệm trong lĩnh vực l&agrave;m đẹp kh&ocirc;ng phẫu thuật sẽ chia sẻ kỹ vấn đề n&agrave;y.</p>\r\n\r\n<p><img alt=\"\" src=\"/upload/8179515746.png\" style=\"height:432px; width:600px\" /></p>\r\n\r\n<p><em>- B&aacute;c sĩ c&oacute; thể cho biết một số c&ocirc;ng nghệ chăm s&oacute;c da được ứng dụng nhiều hiện nay l&agrave; g&igrave;?</em></p>\r\n\r\n<p>-&nbsp; B&ecirc;n cạnh l&agrave;m săn chắc da bằng Thermage FLX, trị sắc tố với Laser PicoSure... việc chăm s&oacute;c v&agrave; bảo dưỡng da cũng rất quan trọng. Về chăm s&oacute;c da, thời gian qua nhiều chị em quen với việc ứng dụng điện chuyển ion Vitamin C để s&aacute;ng da, l&agrave;m mờ c&aacute;c vết th&acirc;m; điện di Placenta gi&uacute;p dưỡng ẩm da, chống l&atilde;o h&oacute;a... Hiện&nbsp; c&ocirc;ng nghệ chăm s&oacute;c da chuy&ecirc;n s&acirc;u HydraFacial nổi tiếng tại Mỹ cũng vừa v&agrave;o Việt Nam.</p>\r\n\r\n<p><em>- C&ocirc;ng nghệ HydraFacial c&oacute; g&igrave; nổi bật?&nbsp;</em></p>\r\n\r\n<p>- Theo tạp ch&iacute;&nbsp;<em>Allure</em>, cứ mỗi 15 gi&acirc;y tr&ecirc;n thế giới, c&oacute; một liệu tr&igrave;nh HydraFacial được thực hiện, gi&uacute;p c&ocirc;ng nghệ n&agrave;y trở th&agrave;nh một trong những giải ph&aacute;p chăm s&oacute;c da chuy&ecirc;n s&acirc;u nổi bật hiện nay, với c&aacute;c ưu điểm:</p>\r\n\r\n<p>HydraFacial gi&uacute;p thanh lọc da bằng massage dẫn lưu bạch huyết. Ch&uacute;ng sử dụng lực h&uacute;t nhẹ từ ống thủy tinh đi dọc theo đường của hệ bạch huyết, dẫn d&ograve;ng chảy bạch huyết ra khỏi nơi tắc nghẽn. Sau 15 ph&uacute;t trải nghiệm, gương mặt sẽ săn chắc, s&aacute;ng hơn v&agrave; t&igrave;nh trạng giữ nước dưới da cũng được cải thiện...</p>\r\n\r\n<p>C&ocirc;ng nghệ n&agrave;y sử dụng đầu tip đặc chế &quot;Vortex&quot; nhằm đưa dung dịch v&agrave; c&aacute;c dưỡng chất xuống dưới da theo lực xoắn ốc, khiến tế b&agrave;o chết v&agrave; chất cặn bị ph&acirc;n r&atilde;. Từ đ&oacute; lỗ ch&acirc;n l&ocirc;ng nở ra để lực h&uacute;t ch&acirc;n kh&ocirc;ng h&uacute;t sạch s&acirc;u mọi chất bẩn t&iacute;ch tụ m&agrave; kh&ocirc;ng cần x&ocirc;ng hơi, kh&ocirc;ng h&uacute;t mụn hay tẩy tế b&agrave;o chết bằng tay...</p>\r\n\r\n<p>HydraFacial cũng sử dụng dung dịch v&agrave; dưỡng chất ch&iacute;nh h&atilde;ng của Mỹ, l&agrave; loại cao cấp nhất (được b&igrave;nh chọn giải &quot;Beauty Choice Award&quot; của tạp ch&iacute; l&agrave;m đẹp NewBeauty, Mỹ trong 4 năm liền -&nbsp; 2015, 2016, 2017 v&agrave; 2018) gồm: Britenol l&agrave;m s&aacute;ng, c&acirc;n bằng sắc tố da, giảm vết th&acirc;m n&aacute;m, đốm m&agrave;u; DermaBuilder l&agrave;m mờ nếp nhăn v&agrave; tăng độ đ&agrave;n hồi; CTGF l&agrave; c&aacute;c yếu tố tăng trưởng gi&uacute;p phục hồi v&agrave; t&aacute;i tạo da...</p>\r\n\r\n<p><em>- C&ocirc;ng nghệ chăm s&oacute;c da chuy&ecirc;n s&acirc;u n&agrave;y ph&ugrave; hợp với đối tượng n&agrave;o?</em></p>\r\n\r\n<p>- HydraFacial c&oacute; thể &aacute;p dụng cho mọi độ tuổi, cả nữ lẫn nam. C&oacute; thể thực hiện ở hầu hết t&igrave;nh trạng da, kể cả những người đang c&oacute; l&agrave;n da trẻ đẹp vẫn muốn duy tr&igrave; vẻ đẹp ấy l&acirc;u d&agrave;i. Đ&acirc;y l&agrave; liệu tr&igrave;nh l&agrave;m đẹp kh&ocirc;ng x&acirc;m lấn, kh&ocirc;ng g&acirc;y đau, kh&ocirc;ng mất thời gian nghỉ dưỡng...</p>\r\n\r\n<p>Ngo&agrave;i chế độ chăm s&oacute;c da l&acirc;u d&agrave;i, nhiều người c&ograve;n d&ugrave;ng HydraFacial như một h&igrave;nh thức l&agrave;m đẹp cấp tốc, ngay trước sự kiện quan trọng như dự tiệc, cưới hỏi... Do đ&oacute;, liệu tr&igrave;nh chăm s&oacute;c da chuy&ecirc;n s&acirc;u HydraFacial được nhiều diễn vi&ecirc;n, người mẫu, doanh nh&acirc;n... y&ecirc;u th&iacute;ch.</p>\r\n\r\n<p><img alt=\"\" src=\"/upload/4706447338.png\" style=\"height:466px; width:660px\" /></p>\r\n\r\n<p><em>- HydraFacial c&oacute; thể kết hợp với c&aacute;c c&ocirc;ng nghệ l&agrave;m đẹp kh&aacute;c?</em></p>\r\n\r\n<p>- T&ugrave;y t&igrave;nh trạng da v&agrave; y&ecirc;u cầu từng người, c&oacute; thể kết hợp HydraFacial với c&aacute;c c&ocirc;ng nghệ kh&aacute;c như: trước v&agrave; sau khi l&agrave;m săn da mặt bằng Thermage FLX; chiếu Laser Pico trị sắc tố v&agrave; trẻ h&oacute;a da để ph&aacute;t huy tối đa c&ocirc;ng dụng; sử dụng xen kẽ với điện di si&ecirc;u &acirc;m Placenta để bảo dưỡng da, đồng thời vẫn c&oacute; thể d&ugrave;ng kết hợp với c&aacute;c dưỡng chất chăm s&oacute;c da th&ocirc;ng thường tại nh&agrave;...</p>\r\n\r\n<p>Việc trị liệu kết hợp n&agrave;y c&oacute; thể hỗ trợ đạt kết quả l&agrave;m đẹp da cao v&igrave; HydraFacial đ&atilde; chuẩn bị sẵn nền da sạch v&agrave; khỏe nhất.</p>\r\n', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `article` VALUES (18, NULL, 10, 'Cà phê \'nhai luôn ly\' của chàng trai 8x', NULL, 'Ly cà phê được làm từ bánh cookie và chocolate trắng... do chàng trai trẻ Trần Thanh Tùng khởi xướng đã tạo thu hút và là điểm dừng chân quen thuộc của nhiều khách hàng trẻ ở Sài Gòn.', '<p>Tốt nghiệp chuy&ecirc;n ng&agrave;nh c&ocirc;ng nghệ th&ocirc;ng tin Trường Khoa học Tự nhi&ecirc;n TP HCM nhưng ch&agrave;ng trai sinh năm 1988 Trần Thanh T&ugrave;ng lại chọn hướng rẽ sự nghiệp của m&igrave;nh theo ng&agrave;nh marketing v&agrave; sau đ&oacute; l&agrave; c&aacute;c dự &aacute;n khởi nghiệp.</p>\r\n\r\n<p>T&ugrave;ng cho biết, nhận thấy bản th&acirc;n y&ecirc;u th&iacute;ch marketing n&ecirc;n sau khi ra trường năm 2010, anh bắt đầu l&agrave;m nhiều vị tr&iacute; li&ecirc;n quan như Marketing Support, Breakthrough Power, Marketing Manager tại một tổ chức phi ch&iacute;nh phủ, c&ugrave;ng bạn b&egrave; khởi nghiệp ở vị tr&iacute; Marketing Manager - Co Founder cho dự &aacute;n Flashcard Blueup hay Trợ l&yacute; quản l&yacute; thương hiệu cho Orion - Choco Pie. Nhờ l&agrave;m nhiều việc c&ugrave;ng l&uacute;c đ&atilde; tạo điều kiện cho T&ugrave;ng t&iacute;ch lũy kiến thức, kinh nghiệm v&agrave; hiểu r&otilde; bản th&acirc;n m&igrave;nh cần g&igrave;, muốn g&igrave;.</p>\r\n\r\n<p><img alt=\"\" src=\"/upload/1735770680.jpg\" style=\"height:333px; width:500px\" /></p>\r\n\r\n<p>Năm 2014, anh được nhận v&agrave;o vị tr&iacute; ph&oacute; trưởng ph&ograve;ng tại một c&ocirc;ng ty lớn với mức lương gần 30 triệu một th&aacute;ng. Nhưng rồi sau một thời gian l&agrave;m việc, T&ugrave;ng nhận thấy bản th&acirc;n kh&ocirc;ng hợp với gi&aacute; trị c&ocirc;ng ty v&agrave; bắt đầu nảy ra &yacute; định t&igrave;m cho m&igrave;nh hướng đi ri&ecirc;ng. Con đường ấy đ&atilde; dần lộ r&otilde; trước mắt ch&agrave;ng trai trẻ kể từ khi dự &aacute;n c&agrave; ph&ecirc; &ldquo;nghĩ đi&ecirc;n l&agrave;m chất&rdquo; mang t&ecirc;n MIB - Monkey in Black Coffee ra đời v&agrave;o th&aacute;ng 8/2014.</p>\r\n\r\n<p>Với c&aacute;i t&ecirc;n được lấy &yacute; tưởng từ bộ phim nổi tiếng Men in Black, T&ugrave;ng mong muốn gửi đến th&ocirc;ng điệp về giấc mơ sống chất, như trong phim, những con người tưởng chừng như b&igrave;nh thường nhưng đằng sau c&aacute;nh cửa l&agrave; những c&aacute; nh&acirc;n v&ocirc; c&ugrave;ng xuất ch&uacute;ng mang lại nhiều điều mới mẻ v&agrave; cứu rỗi cho cuộc đời.</p>\r\n\r\n<p>Chia sẻ l&yacute; do quyết định khởi nghiệp n&agrave;y, T&ugrave;ng cho biết, bản th&acirc;n anh nghĩ &quot;con người sống nay chết mai&quot; kh&ocirc;ng biết đ&acirc;u m&agrave; lần. Do đ&oacute;, ngay h&ocirc;m nay anh phải l&agrave;m c&aacute;i g&igrave; cho thoả niềm đam m&ecirc;. V&agrave; việc mở MIB c&ugrave;ng người đồng sự đ&atilde; cho anh ba c&aacute;i &quot;đ&atilde;&quot;. Thứ nhất l&agrave; c&aacute; nh&acirc;n T&ugrave;ng rất th&iacute;ch c&agrave; ph&ecirc;; Thứ hai l&agrave; anh th&iacute;ch chia sẻ, x&acirc;y dựng cộng đồng c&aacute;c bạn trẻ &quot;nghĩ đi&ecirc;n l&agrave;m chất&quot; v&agrave; cuối c&ugrave;ng l&agrave; muốn cuộc sống do m&igrave;nh l&agrave;m chủ, muốn l&agrave;m g&igrave; th&igrave; l&agrave;m.</p>\r\n\r\n<p>Với lợi thế đi l&agrave;m nhiều năm c&ugrave;ng một v&agrave;i dự &aacute;n khởi nghiệp trước, anh nhận thấy bản th&acirc;n m&igrave;nh đ&atilde; phần n&agrave;o t&iacute;ch lũy được kiến thức, kỹ năng v&agrave; kinh nghiệm để tạo nền tảng tốt trước khi ch&iacute;nh thức bước v&agrave;o cuộc đua của ch&iacute;nh m&igrave;nh.</p>\r\n\r\n<p>Th&ecirc;m v&agrave;o đ&oacute;, sự trải nghiệm một năm gap &ndash; year (quyết định &ldquo;nghỉ giữa hiệp&rdquo; trong một qu&aacute; tr&igrave;nh l&agrave;m việc, cho ph&eacute;p t&igrave;m đến những kế hoạch kh&aacute;c biệt) với c&agrave; ph&ecirc; c&ugrave;ng sự hỗ trợ tận t&igrave;nh từ người bạn th&acirc;n đ&atilde; gi&uacute;p anh tự tin trong dự &aacute;n khởi nghiệp n&agrave;y.</p>\r\n\r\n<p>Thuận lợi l&agrave; thế, tuy nhi&ecirc;n bất kể doanh nghiệp n&agrave;o khi mới bắt đầu đều c&oacute; những kh&oacute; khăn nhất định. Với qu&aacute;n của T&ugrave;ng cũng kh&ocirc;ng ngoại lệ. Thời gian ba th&aacute;ng đầu hoạt động, do chi ph&iacute; qu&aacute; cao từ vật liệu l&agrave;m sản phẩm, lương thưởng cho nh&acirc;n vi&ecirc;n khiến qu&aacute;n hụt thu. L&uacute;c ấy, c&oacute; thời điểm anh tưởng chừng chỉ c&ograve;n hai tuần nữa l&agrave; sẽ đ&oacute;ng cửa v&igrave; mất khả năng t&agrave;i ch&iacute;nh.</p>\r\n\r\n<p>Nhưng rồi &yacute; tưởng &quot;c&agrave; ph&ecirc; nhai lu&ocirc;n ly&quot; - tức vỏ ly đựng c&agrave; ph&ecirc; được l&agrave;m bằng b&aacute;nh cookie v&agrave; chocolate trắng, khi uống xong l&agrave; c&oacute; thể ăn lu&ocirc;n phần ly, bắt đầu xuất hiện (do nh&oacute;m s&aacute;ng tạo ra) đ&atilde; trở th&agrave;nh yếu tố quyết định qu&aacute;n tiếp tục hoạt động.</p>\r\n\r\n<p>B&ecirc;n cạnh đ&oacute;, nh&oacute;m T&ugrave;ng đ&atilde; kh&ocirc;ng quản ngại vất vả, l&agrave;m việc ng&agrave;y 18 tiếng với mong muốn đưa qu&aacute;n phục hồi. &quot;Thời gian đ&oacute;, m&igrave;nh lu&ocirc;n gặp &aacute;p lực v&igrave; lượng c&ocirc;ng việc qu&aacute; lớn. Nhưng cũng chỉ biết tự trấn an bản th&acirc;n bằng những suy nghĩ như d&ugrave; chuyện g&igrave; xảy ra đi nữa th&igrave; đời vẫn đẹp, ta vẫn đi&ecirc;n v&agrave; đời ta lu&ocirc;n chất...&rdquo;, T&ugrave;ng nhớ lại.</p>\r\n\r\n<p><img alt=\"\" src=\"/upload/6748499923.jpg\" style=\"height:533px; width:400px\" /></p>\r\n\r\n<p>T&ugrave;ng v&agrave; c&aacute;c cộng sự đ&atilde; trải qua nhiều giai đoạn gian tru&acirc;n kh&aacute;c nhau từ h&igrave;nh th&agrave;nh &yacute; tưởng, mong muốn tạo th&agrave;nh một thương hiệu giống t&iacute;nh c&aacute;ch chủ, rồi bước v&agrave;o giai đoạn vật v&atilde; ra mắt, sau đ&oacute; l&agrave; thời kỳ thiếu tiền đến quyết định sống hay chết; giai đoạn ph&aacute;t triển v&agrave; cuối c&ugrave;ng l&agrave; giai đoạn t&aacute;i quản l&yacute; dưới dạng hệ thống, củng cố nh&acirc;n sự...</p>\r\n\r\n<p>Sau những kh&uacute;c quanh co ấy, T&ugrave;ng v&agrave; những người bạn đ&atilde; tạo n&ecirc;n bước ngoặt quan trọng tr&ecirc;n con đường chinh phục giấc mơ &ldquo;đi&ecirc;n&rdquo; khi vinh dự gi&agrave;nh giải &Yacute; tưởng s&aacute;ng tạo nhất của cuộc thi &Yacute; tưởng khởi nghiệp do BSSC (Trung t&acirc;m hỗ trợ khởi nghiệp trực thuộc Th&agrave;nh Đo&agrave;n TP HCM) tổ chức. Đ&acirc;y l&agrave; cuộc thi khởi nghiệp lớn nhất 2015 với sự tham gia của hơn 10.000 khởi nghiệp vi&ecirc;n với tr&ecirc;n 5.000 đơn tham dự chương tr&igrave;nh tr&ecirc;n khắp cả nước. Từ đ&oacute;, qu&aacute;n của anh cũng được ch&uacute; &yacute; v&agrave; thu h&uacute;t giới trẻ nhiều hơn.<br />\r\n<br />\r\nTheo T&ugrave;ng, l&yacute; do MIB thắng giải cũng như h&uacute;t được giới trẻ bởi lu&ocirc;n c&oacute; những sản phẩm s&aacute;ng tạo. Cứ một tuần l&agrave; gần như sẽ c&oacute; một lần nh&oacute;m đưa ra sản phẩm mới. Trong đ&oacute;, những sản phẩm c&oacute; t&iacute;nh lan truyền cao như: Huyền thoại nhai lu&ocirc;n ly; Đ&aacute; đổi vị - đ&aacute; thay đổi vị của ly nước trong qu&aacute; tr&igrave;nh uống - ho&agrave;n to&agrave;n tự nhi&ecirc;n; Uống lu&ocirc;n x&ocirc; - Tr&agrave;o lưu ăn x&ocirc; uống t&ocirc; trong giới trẻ hiện giờ l&agrave; do MIB khởi xướng v&agrave;o cuối năm 2014. Hay như b&aacute;nh cầu vồng - b&aacute;nh 6 m&agrave;u ủng hộ người đồng t&iacute;nh - LGBT; Nhai lu&ocirc;n chậu c&acirc;y - Lời ti&ecirc;n tri: B&aacute;nh nh&igrave;n y như chậu c&acirc;y, b&ecirc;n dưới c&oacute; lời sấm truyền về vận mệnh; Chương tr&igrave;nh x&atilde; hội &quot;No Bra No Pay&quot; - n&acirc;ng cao nhận thức về ung thư v&uacute;; C&agrave; ph&ecirc; &ocirc;m&quot; - &Ocirc;m nhau đi v&igrave; cuộc đời cho ph&eacute;p...</p>\r\n\r\n<p>Với số vốn 700 triệu đồng ban đầu để cho ra qu&aacute;n c&agrave; ph&ecirc; MIB đầu ti&ecirc;n tại TP HCM, sau hơn một năm đi v&agrave;o hoạt động, giờ nh&oacute;m của T&ugrave;ng đ&atilde; c&oacute; th&ecirc;m qu&aacute;n thứ hai với lượng kh&aacute;ch ng&agrave;y c&agrave;ng đ&ocirc;ng. Hiện nay, mỗi ng&agrave;y qu&aacute;n của T&ugrave;ng b&aacute;n từ 200 đến 400 ly c&agrave; ph&ecirc; v&agrave; mang về doanh thu kh&aacute; lớn. B&iacute; quyết kinh doanh của ch&agrave;ng trai trẻ nằm trong ch&iacute;nh slogan của qu&aacute;n &quot;nghĩ đi&ecirc;n l&agrave;m chất&quot;.</p>\r\n\r\n<p>Theo T&ugrave;ng, để l&agrave;m c&agrave; ph&ecirc; th&agrave;nh c&ocirc;ng, c&ocirc;ng thức của anh rất đơn giản: Kh&aacute;ch h&agrave;ng l&agrave; tầng lớp n&agrave;o? Đồ uống hoặc m&oacute;n ăn phải ngon. Chỗ ngồi tốt, vệ sinh, m&aacute;t mẻ. Ngo&agrave;i ra phải c&oacute; thứ g&igrave; lạ? B&agrave;i to&aacute;n ở đ&acirc;y &ldquo;lạ&rdquo; l&agrave; g&igrave;?&rdquo;...</p>\r\n\r\n<p>T&ugrave;ng chia sẻ, một trong những yếu tố quan trọng để MIB ph&aacute;t triển cho đến thời điểm hiện tại l&agrave; con người. Anh rất may mắn khi c&oacute; người đồng sự giỏi - một nữ gi&aacute;m đốc kinh doanh của c&aacute;c c&ocirc;ng ty lớn, c&oacute; kinh nghiệm 10 năm quản trị c&aacute;c dự &aacute;n tầm cỡ c&oacute; gi&aacute; trị tr&ecirc;n 100 triệu USD tr&ecirc;n mỗi dự &aacute;n. &quot;Ch&iacute;nh điều n&agrave;y gi&uacute;p qu&aacute;n c&oacute; thể tạo lập những hướng đi chiến lược để l&agrave;m n&ecirc;n sự kh&aacute;c biệt trong cộng đồng&quot;, T&ugrave;ng n&oacute;i.</p>\r\n\r\n<p>Trong tương lai, ch&agrave;ng trai trẻ sinh năm 1988 n&agrave;y mong muốn x&acirc;y dựng c&agrave;ng nhiều c&acirc;u lạc bộ &ldquo;nghĩ đi&ecirc;n l&agrave;m chất&rdquo; để tạo thật nhiều gi&aacute; trị cho đời sống.</p>\r\n', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `article` VALUES (19, NULL, 1, 'sdsad', NULL, 'dsa', '<p>ds</p>\r\n', NULL, NULL, '2019-05-13 16:09:57', NULL, NULL, NULL, NULL, NULL);
INSERT INTO `article` VALUES (20, NULL, 1, 'sdsa', NULL, 'dsad', '<p>dsad</p>\r\n\r\n<p><img alt=\"\" src=\"/upload/1799059186.jpg\" style=\"height:299px; width:500px\" /></p>\r\n', NULL, NULL, '2019-05-14 11:12:24', NULL, NULL, NULL, NULL, NULL);
INSERT INTO `article` VALUES (21, NULL, 14, 'HAPPY', NULL, 'AHIHI DDOO NGOOCS', '<p>dsa</p>\r\n\r\n<p><img alt=\"\" src=\"/upload/1799059186.jpg\" style=\"height:299px; width:500px\" /></p>\r\n\r\n<p><img alt=\"\" src=\"/upload/6748499923.jpg\" style=\"height:533px; width:400px\" /></p>\r\n', 1, 2, '2019-05-14 11:18:11', NULL, NULL, NULL, 1, NULL);
INSERT INTO `article` VALUES (22, NULL, 3, 'nm', NULL, 'iui', NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

-- ----------------------------
-- Table structure for articleimages
-- ----------------------------
DROP TABLE IF EXISTS `articleimages`;
CREATE TABLE `articleimages`  (
  `ArtImgID` int(11) NOT NULL AUTO_INCREMENT,
  `ArtID` int(11) NOT NULL,
  `Path` text CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  PRIMARY KEY (`ArtImgID`) USING BTREE,
  INDEX `fk_artimg_art1`(`ArtID`) USING BTREE,
  CONSTRAINT `fk_artimg_art1` FOREIGN KEY (`ArtID`) REFERENCES `article` (`ArtID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for articletags
-- ----------------------------
DROP TABLE IF EXISTS `articletags`;
CREATE TABLE `articletags`  (
  `ArtID` int(11) NOT NULL,
  `TagID` int(11) NOT NULL,
  PRIMARY KEY (`ArtID`, `TagID`) USING BTREE,
  INDEX `fk_arttag_tag1`(`TagID`) USING BTREE,
  CONSTRAINT `fk_arttag_art1` FOREIGN KEY (`ArtID`) REFERENCES `article` (`ArtID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_arttag_tag1` FOREIGN KEY (`TagID`) REFERENCES `tag` (`TagID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of articletags
-- ----------------------------
INSERT INTO `articletags` VALUES (21, 1);
INSERT INTO `articletags` VALUES (21, 2);
INSERT INTO `articletags` VALUES (21, 3);

-- ----------------------------
-- Table structure for articleyoutubes
-- ----------------------------
DROP TABLE IF EXISTS `articleyoutubes`;
CREATE TABLE `articleyoutubes`  (
  `ArtID` int(11) NOT NULL,
  `YoutubeID` int(11) NOT NULL,
  PRIMARY KEY (`ArtID`, `YoutubeID`) USING BTREE,
  INDEX `fk_artut_ut1`(`YoutubeID`) USING BTREE,
  CONSTRAINT `fk_artut_art1` FOREIGN KEY (`ArtID`) REFERENCES `article` (`ArtID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_artut_ut1` FOREIGN KEY (`YoutubeID`) REFERENCES `youtube` (`YoutubeID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for category
-- ----------------------------
DROP TABLE IF EXISTS `category`;
CREATE TABLE `category`  (
  `CatID` int(11) NOT NULL AUTO_INCREMENT,
  `CatName` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `CatIsActive` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`CatID`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 13 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

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
  `ArtID` int(11) DEFAULT NULL,
  `SubscriberID` int(11) DEFAULT NULL,
  `CommentContent` text CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  `CommentCreatedOn` datetime(0) DEFAULT NULL,
  `Likes` int(11) DEFAULT NULL,
  `Dislikes` int(11) DEFAULT NULL,
  PRIMARY KEY (`CommentID`) USING BTREE,
  INDEX `fk_cmt_art1`(`ArtID`) USING BTREE,
  INDEX `fk_cmt_sub1`(`SubscriberID`) USING BTREE,
  CONSTRAINT `fk_cmt_art1` FOREIGN KEY (`ArtID`) REFERENCES `article` (`ArtID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_cmt_sub1` FOREIGN KEY (`SubscriberID`) REFERENCES `subscriber` (`SubscriberID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for editor
-- ----------------------------
DROP TABLE IF EXISTS `editor`;
CREATE TABLE `editor`  (
  `EditorID` int(11) NOT NULL AUTO_INCREMENT,
  `AccID` int(11) DEFAULT NULL,
  `Avatar` text CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  `EditorName` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `DOB` date DEFAULT NULL,
  PRIMARY KEY (`EditorID`) USING BTREE,
  INDEX `fk_editor_account1`(`AccID`) USING BTREE,
  CONSTRAINT `fk_editor_account1` FOREIGN KEY (`AccID`) REFERENCES `account` (`AccID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for rank
-- ----------------------------
DROP TABLE IF EXISTS `rank`;
CREATE TABLE `rank`  (
  `RankID` int(11) NOT NULL AUTO_INCREMENT,
  `RankName` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`RankID`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

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
  `RoleName` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`RoleID`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of role
-- ----------------------------
INSERT INTO `role` VALUES (1, 'Subscriber');
INSERT INTO `role` VALUES (2, 'Writer');
INSERT INTO `role` VALUES (3, 'Editor');

-- ----------------------------
-- Table structure for status
-- ----------------------------
DROP TABLE IF EXISTS `status`;
CREATE TABLE `status`  (
  `StatusID` int(11) NOT NULL AUTO_INCREMENT,
  `StatusName` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`StatusID`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of status
-- ----------------------------
INSERT INTO `status` VALUES (1, 'Chưa được duyệt');
INSERT INTO `status` VALUES (2, 'Đã được duyệt và chờ xuất bản');
INSERT INTO `status` VALUES (3, 'Đã xuất bản');
INSERT INTO `status` VALUES (4, 'Bị từ chối');

-- ----------------------------
-- Table structure for subcategories
-- ----------------------------
DROP TABLE IF EXISTS `subcategories`;
CREATE TABLE `subcategories`  (
  `SubCatID` int(11) NOT NULL AUTO_INCREMENT,
  `CatID` int(11) DEFAULT NULL,
  `SubCatName` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `SubCatIsActive` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`SubCatID`) USING BTREE,
  INDEX `fk_cat_subcat1`(`CatID`) USING BTREE,
  CONSTRAINT `subcategories_ibfk_1` FOREIGN KEY (`CatID`) REFERENCES `category` (`CatID`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 31 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of subcategories
-- ----------------------------
INSERT INTO `subcategories` VALUES (1, 1, 'Chính trị', 1);
INSERT INTO `subcategories` VALUES (2, 1, 'Giao thông', 1);
INSERT INTO `subcategories` VALUES (3, 2, 'Pháp đình', 1);
INSERT INTO `subcategories` VALUES (4, 2, 'Vụ án', 1);
INSERT INTO `subcategories` VALUES (5, 3, 'Quân sự', 1);
INSERT INTO `subcategories` VALUES (6, 3, 'Người Việt 4 phương', 1);
INSERT INTO `subcategories` VALUES (7, 3, 'Tư liệu', 1);
INSERT INTO `subcategories` VALUES (8, 4, 'Bất động sản', 1);
INSERT INTO `subcategories` VALUES (9, 4, 'Hàng không', 1);
INSERT INTO `subcategories` VALUES (10, 4, 'Doanh nhân', 1);
INSERT INTO `subcategories` VALUES (11, 5, 'Mobile', 1);
INSERT INTO `subcategories` VALUES (12, 5, 'Internet', 1);
INSERT INTO `subcategories` VALUES (13, 6, 'Thể thao Việt Nam', 1);
INSERT INTO `subcategories` VALUES (14, 6, 'Thể thao Thế giới', 1);
INSERT INTO `subcategories` VALUES (15, 6, 'Hậu trường thể thao', 1);
INSERT INTO `subcategories` VALUES (16, 7, 'Nhạc Việt', 1);
INSERT INTO `subcategories` VALUES (17, 7, 'Nhạc Âu Mỹ', 1);
INSERT INTO `subcategories` VALUES (18, 7, 'Nhạc Hàn', 1);
INSERT INTO `subcategories` VALUES (19, 8, 'Phim chiếu rạp', 1);
INSERT INTO `subcategories` VALUES (20, 8, 'Phim truyền hình', 1);
INSERT INTO `subcategories` VALUES (21, 9, 'Thời trang sao', 1);
INSERT INTO `subcategories` VALUES (22, 9, 'Mặc đẹp', 1);
INSERT INTO `subcategories` VALUES (23, 9, 'Làm đẹp', 1);
INSERT INTO `subcategories` VALUES (24, 10, 'Địa điểm du lịch', 1);
INSERT INTO `subcategories` VALUES (25, 10, 'Kinh nghiệm du lịch', 1);
INSERT INTO `subcategories` VALUES (26, 10, 'Phượt', 1);
INSERT INTO `subcategories` VALUES (27, 11, 'Khỏe đẹp', 1);
INSERT INTO `subcategories` VALUES (28, 11, 'Dinh dưỡng', 1);
INSERT INTO `subcategories` VALUES (29, 12, 'Tư vấn', 1);
INSERT INTO `subcategories` VALUES (30, 12, 'Học Tiếng Anh', 1);

-- ----------------------------
-- Table structure for subscriber
-- ----------------------------
DROP TABLE IF EXISTS `subscriber`;
CREATE TABLE `subscriber`  (
  `SubscriberID` int(11) NOT NULL AUTO_INCREMENT,
  `AccID` int(11) DEFAULT NULL,
  `Avatar` text CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  `SubscriberName` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `DOB` date DEFAULT NULL,
  `BoughtOn` datetime(0) DEFAULT NULL,
  `ExpiredOn` datetime(0) DEFAULT NULL,
  PRIMARY KEY (`SubscriberID`) USING BTREE,
  INDEX `fk_sub_account1`(`AccID`) USING BTREE,
  CONSTRAINT `fk_sub_account1` FOREIGN KEY (`AccID`) REFERENCES `account` (`AccID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of subscriber
-- ----------------------------
INSERT INTO `subscriber` VALUES (1, 3, '/img/user/default-avatar.jpg', 'Hồng Đào', '1992-10-17', NULL, NULL);
INSERT INTO `subscriber` VALUES (2, 4, '/img/user/default-avatar.jpg', 'Nguyen Dat', '1917-10-16', NULL, NULL);

-- ----------------------------
-- Table structure for tag
-- ----------------------------
DROP TABLE IF EXISTS `tag`;
CREATE TABLE `tag`  (
  `TagID` int(11) NOT NULL AUTO_INCREMENT,
  `TagName` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`TagID`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tag
-- ----------------------------
INSERT INTO `tag` VALUES (1, 'phim');
INSERT INTO `tag` VALUES (2, 'nhac');
INSERT INTO `tag` VALUES (3, 'video');

-- ----------------------------
-- Table structure for writer
-- ----------------------------
DROP TABLE IF EXISTS `writer`;
CREATE TABLE `writer`  (
  `WriterID` int(11) NOT NULL AUTO_INCREMENT,
  `AccID` int(11) DEFAULT NULL,
  `Avatar` text CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  `Pseudonym` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `WriterName` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `DOB` date DEFAULT NULL,
  PRIMARY KEY (`WriterID`) USING BTREE,
  INDEX `fk_writer_account1`(`AccID`) USING BTREE,
  CONSTRAINT `fk_writer_account1` FOREIGN KEY (`AccID`) REFERENCES `account` (`AccID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of writer
-- ----------------------------
INSERT INTO `writer` VALUES (1, 2, 'https://mdbootstrap.com/img/Photos/Avatars/avatar-2.jpg', 'Mimi', 'HongDao', '1997-02-06');

-- ----------------------------
-- Table structure for youtube
-- ----------------------------
DROP TABLE IF EXISTS `youtube`;
CREATE TABLE `youtube`  (
  `YoutubeID` int(11) NOT NULL AUTO_INCREMENT,
  `Link` text CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  PRIMARY KEY (`YoutubeID`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Procedure structure for insertTag
-- ----------------------------
DROP PROCEDURE IF EXISTS `insertTag`;
delimiter ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `insertTag`()
begin
	if(select 1=1 from article where ArtID=27) then
		select* from article;
	end if;
end
;;
delimiter ;

SET FOREIGN_KEY_CHECKS = 1;
