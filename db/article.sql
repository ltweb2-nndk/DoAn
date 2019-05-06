/*
 Navicat Premium Data Transfer

 Source Server         : WEB PROJECT
 Source Server Type    : MySQL
 Source Server Version : 50721
 Source Host           : localhost:3306
 Source Schema         : article

 Target Server Type    : MySQL
 Target Server Version : 50721
 File Encoding         : 65001

 Date: 24/04/2019 20:58:01
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
  PRIMARY KEY (`AccID`) USING BTREE,
  UNIQUE INDEX `pk_account`(`AccID`) USING BTREE,
  INDEX `fk_account_role`(`RoleID`) USING BTREE,
  INDEX `Username`(`Username`) USING BTREE,
  CONSTRAINT `fk_account_role` FOREIGN KEY (`RoleID`) REFERENCES `role` (`RoleID`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE = InnoDB AUTO_INCREMENT = 12 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of account
-- ----------------------------
INSERT INTO `account` VALUES (1, 1, 'kimhienit16@gmail.com', '07021998', 1, '2019-04-23 13:39:24.000000');
INSERT INTO `account` VALUES (2, 2, 'phuonganh@gmail.com', '01011997', 1, '2019-04-24 16:39:30.000000');
INSERT INTO `account` VALUES (3, 3, 'hoanhu@gmail.com', '08021998', 1, '2019-04-23 13:39:38.000000');
INSERT INTO `account` VALUES (4, 2, NULL, '', 1, NULL);
INSERT INTO `account` VALUES (5, 2, 'kimhien', 'hhhh', 1, NULL);
INSERT INTO `account` VALUES (6, 2, '', '', 1, NULL);
INSERT INTO `account` VALUES (7, 2, 'hhhhhooooo', '$2b$10$aXxbYwis68UutxEC/zDMtuW1JfOQSuP0WIlR1Uezm7ab55GQqVlZ.', 1, NULL);
INSERT INTO `account` VALUES (8, 2, 'hhhhhooooo', '$2b$10$seyQHklpmP7uUvPUSSP8j.TC9avOMcfgGGcMXRe4Ss0dMztcGsP.a', 1, NULL);
INSERT INTO `account` VALUES (9, 2, 'kimhienit16@gmail.com', '$2b$10$YheAlyGOtNBLBGyWY2/qRe2KDwy2urhoMr91jLzgisY5boPnKuXii', 1, NULL);
INSERT INTO `account` VALUES (10, 2, 'kimhienit16@gmail.com', '$2b$10$sR61boikuZoFd6AkaAcWXuHjLzcIQELcknQAgBv4N/iT6L9s8Jq0S', 1, NULL);
INSERT INTO `account` VALUES (11, 2, 'kimhienit16@gmail.com', '$2b$10$n6l1kJD.0.8iMsFnpiW/b.wNOZ3FlKnUJJC7.o4UvcBiG66s09Anm', 1, NULL);

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
INSERT INTO `article` VALUES (1, 'TP.HCM thay đổi hàng loạt nhân sự trong năm 2018 và đầu năm 2019', 1, '9 tháng năm 2018, TP.HCM luân chuyển 556 cán bộ thuộc 19 bộ, sở, ngành. Gần đây nhất, nguyên Bí thư Tỉnh ủy Tây Ninh Trần Lưu Quang được điều động thay thế ông Tất Thành Cang.', NULL, 'Images/Thời sự/Chính trị/Art_01.jpg', NULL, NULL, '2019-04-19 12:37:47.000000', NULL, NULL, NULL, NULL, NULL);
INSERT INTO `article` VALUES (2, 'Thiếu tá CSGT bị tông gục khi đang giữ xe vi phạm', 2, 'Một thiếu tá CSGT bị thanh niên 16 tuổi đi xe máy tông gục khi đang lập biên bản tạm giữ xe vi phạm trên quốc lộ 21B Hà Nội.', 'Tối 18/4, lãnh đạo Đội CSGT số 10 (Phòng CSGT Công an TP Hà Nội) cho biết Cơ quan CSĐT Công an huyện Thanh Oai (Hà Nội) đang thụ lý giải quyết vụ việc thanh niên đi xe máy chạy tốc độ cao tông vào thiếu tá CSGT trên quốc lộ 21B.\r\n\r\nThông tin ban đầu, hồi 19h33 tại Km3 quốc lộ 21B thuộc xã Bích Hoà, huyện Thanh Oai, tổ công tác thuộc Đội CSGT số 10 do trung tá Vũ Kiên Cường làm tổ trưởng làm nhiệm vụ xử lý người đi môtô, xe gắn máy không đội mũ bảo hiểm chiều từ huyện Thanh Oai đi quận Hà Đông.Theo trung tá Vũ Kiên Cường, vào thời điểm này, tổ công tác dừng làm việc và đang lập biên bản một trường hợp vi phạm bị tạm giữ xe thì một thanh niên lái môtô mang biển kiểm soát Hà Nội đi theo hướng Thanh Oai - Hà Đông chạy với tốc độ cao tông vào thiếu tá Từ Nguyên Nghĩa.\r\n\r\nCú tông làm thiếu tá Từ Nghĩa ngã xuống đường, rách trán; thanh niên lái môtô cũng bị ngã, trầy xước nhẹ.\r\n\r\nDanh tính nam thanh niên được xác định là Nguyễn Văn Quân (SN 2003, ở Tổ 8, phường Yên Nghĩa, quận Hà Đông, TP Hà Nội).\r\n\r\n“Ngay sau đó, cảnh sát đã đưa thiếu tá Nghĩa và Nguyễn Văn Quân đi Bệnh viện 103 để kiểm tra, băng bó vết thương”, trung tá Vũ Kiên Cường nói và cho biết, sau đó, Đội CSGT trật tự cơ động, Đội CSĐT Công an huyện Thanh Oai có mặt khám nghiệm hiện trường, xác định nguyên nhân vụ việc.', 'Images/Thời sự/Giao thông/Art_02.jpg', NULL, NULL, '2019-04-19 12:41:50.000000', NULL, NULL, NULL, NULL, NULL);
INSERT INTO `article` VALUES (3, 'Vì sao tòa cho ông Vũ nắm cổ phần của bà Thảo ở Trung Nguyên?', 3, 'Từ 2015, 2 bên xảy ra hàng loạt vụ kiện ảnh hưởng thương hiệu và hoạt động của các công ty ở Trung Nguyên, nên tòa nhận định cần thiết giao cổ phần bà Thảo cho ông Vũ quản lý.', 'Chiều 27/3, TAND TP.HCM đã đưa ra phán quyết đối với vụ ly hôn giữa ông Đặng Lê Nguyên Vũ và bà Lê Hoàng Diệp Thảo.\r\n\r\nTheo đó, tòa công nhận thuận tình ly hôn giữa ông Vũ và bà Thảo; giao bà Thảo nuôi các con chung và chấp nhận sự tự nguyện của ông Vũ cấp dưỡng các cháu 10 tỷ/năm tính từ 2013. Ông Vũ có quyền chăm sóc, giáo dục con chưa thành niên; ông Vũ có quyền yêu cầu Tòa án thay đổi người nuôi con nếu có đủ điều kiện.\r\n\r\nNgoài ra tòa giao ông Vũ tất cả cổ phần trong các công ty của Tập đoàn Trung Nguyên; được quản lý tài sản đất và gắn liền với đất tương đương 6 bất động sản trị giá 350 tỷ.Về phía bà Thảo được giao tiền, vàng, bất động sản đang quản lý, quyền sử dụng đất và gắn liền với đất gồm 7 bất động sản trị giá 375 tỷ; tài sản quy ra tiền tương đương hơn 1.764 tỷ. Và ông Vũ có trách nhiệm thanh toán phần chênh lệch hơn 1.200 tỷ cho bà Thảo.\r\n\r\nGần 1.700 tỷ phản tố là tài sản chung\r\nSố tài sản bao gồm tiền, vàng đứng tên bà Thảo tại các ngân hàng mà phía ông Vũ phản tố, đề nghị Tòa xác minh đưa vào phân chia; ban đầu được xác định hơn 2.100 tỷ nhưng do sau đó phía Eximbank xác định lại 10.000 chỉ vàng chứ không phải 10.000 lượng nên số tiền phản tố giảm từ 2.100 tỷ xuống còn gần 1.700 tỷ.\r\n\r\nPhía bà Thảo không đồng ý việc phản tố này, cho rằng đây không phải tài sản chung, đề nghị tòa bác bỏ. Đại diện VKS cho rằng tòa có sai sót về mặt tố tụng trong việc đem ra hòa giải và công bố việc xác minh.', 'Images/Pháp luật/Pháp đình/Art_03.jpg', NULL, NULL, '2019-04-19 12:46:10.000000', NULL, NULL, NULL, NULL, NULL);
INSERT INTO `article` VALUES (4, 'Xử lý thế nào kẻ thấy nữ sinh giao gà bị hãm hiếp nhưng không tố giác?', 4, 'Tại nhà mình, Thu nhìn thấy nhóm bị can thay nhau hãm hiếp nạn nhân Duyên nhưng không tố cáo mà còn che giấu tội ác, khai báo gian dối và tung tin giả đánh lừa cảnh sát.', 'Liên quan vụ sát hại, cướp tài sản và hiếp dâm nữ sinh Cao Mỹ Duyên rúng động tỉnh Điện Biên dịp Tết, cơ quan điều tra đã khởi tố 8 bị can với 6 tội danh nghiêm trọng.\r\n\r\nTrong số này, Bùi Thị Kim Thu (44 tuổi, ở xã Thanh Nưa, huyện Điện Biên) là vợ của tên chủ mưu Bùi Văn Công (44 tuổi). Thu bị bắt tạm giam về tội Không tố giác tội phạm.\r\n\r\nQuá trình điều tra, cảnh sát xác định người phụ nữ ít nhất 2 lần chứng kiến các bị can thay nhau hãm hiếp nạn nhân khi chúng đã sử dụng ma túy tại nhà cô ta. Thậm chí, thấy một bị can hiếp dâm nữ sinh trong phòng ngủ của mình, Thu còn cáu gắt: \"Chúng mày đừng làm trò đó trong buồng của tao\".\r\n\r\nTuy nhiên, làm việc với cảnh sát, Thu đã không tố cáo tội ác của những kẻ đồi bại. Cô ta còn khai báo nhỏ giọt, tung nhiều tin giả đánh lừa công an khiến quá trình điều tra kéo dài, gặp khó khăn.', 'Images/Pháp luật/Vụ án', NULL, NULL, '2019-04-19 12:49:36.000000', NULL, NULL, NULL, NULL, NULL);
INSERT INTO `article` VALUES (5, 'Đảng Dân chủ chưa vội luận tội TT Trump sau báo cáo \'bom tấn\' Mueller', 5, 'THẾ GIỚI\r\nĐảng Dân chủ chưa vội luận tội TT Trump sau báo cáo \'bom tấn\' Mueller\r\nTuyết Mai10:25 19/04/2019\r\n\r\nCác hạ nghị sĩ đảng Dân chủ tỏ ra thờ ơ trong việc luận tội Tổng thống Trump dù 10 trường hợp cản trở công lý trong báo cáo của công tố viên đặc biệt Mueller đã được công bố.', 'Phỏng vấn của Politico với một số thành viên đảng Dân chủ cho thấy họ nghĩ rằng bản báo cáo này gây tổn hại nặng nề cho tổng thống với bằng chứng đáng kể rằng ông đã cố gắng làm trật bánh cuộc điều tra Nga. Mặc dù vậy, nó không đủ mạnh để đảng Dân chủ chấp nhận rủi ro chính trị khi tìm cách đẩy ông Trump khỏi văn phòng tổng thống.\r\n\r\n\"Thời gian bầu cử là lúc đánh bại Trump. Hiện tại, ông ấy có đủ sự bảo vệ xung quanh mình từ luật sư hàng đầu đất nước để giữ ghế cho ông ấy\", Raúl Grijalva, thành viên cao cấp của đảng Dân chủ, nhận xét. Ông ám chỉ Bộ trưởng Tư pháp William Barr, người chịu một loạt chỉ trích từ đảng Dân chủ vì biên soạn báo cáo trước khi phát hành, hành động được cho là nhằm bao che cho tổng thống.\r\n\r\nÔng Mueller không đi đến kết luận pháp lý về việc liệu Tổng thống Trump có cản trở công lý trong việc xử lý các cuộc điều tra về bản thân ông và nhóm của ông hay không.\r\n\r\nNhóm của công tố viên đặc biệt cũng không tìm thấy đủ bằng chứng buộc tội tổng thống hoặc các trợ lý của ông thông đồng với các quan chức Nga để gây ảnh hưởng đến cuộc bầu cử 2016.\r\n\r\nMột số thành viên đảng Dân chủ và chuyên gia pháp lý tin rằng những phát hiện của ông Mueller về vấn đề cản trở công lý cung cấp cho Quốc hội hướng đi rõ ràng để theo đuổi các thủ tục luận tội.\r\n\r\nTrong hai năm, Chủ tịch Hạ viện Nancy Pelosi và các đảng viên Dân chủ hàng đầu đã hoãn vấn đề luận tội cho đến khi cuộc điều tra của công tố viên đặ', 'Images/Thế giới/Quân sự/Art_05.jpg', NULL, NULL, '2019-04-19 12:53:19.000000', NULL, NULL, NULL, NULL, NULL);
INSERT INTO `article` VALUES (6, 'Hàng trăm người Việt ở Mỹ bị nhà thờ \'đa cấp\' lừa gần 25 triệu USD', 6, 'Công tố viên cho biết các nạn nhân đã dốc hết toàn bộ tài sản của mình cho \"nhà thờ ảo\" được Kent Whitney, có tiền án lừa đảo tài chính, sáng lập chỉ ba tháng sau khi ra tù.', 'Những người đóng góp còn được thưởng 100 USD cho mỗi khoản đầu tư 10.000 USD mà mình giới thiệu cho nhà thờ. Mục sư khuyến khích những người tham gia lôi kéo thêm bạn bè và người thân gia đình đầu tư vào quỹ của CHS.\r\n\r\nĐầu tháng 3, theo đề nghị của Ủy ban Chứng khoán và Sàn giao dịch Mỹ (SEC), một thẩm phán Tòa sơ thẩm liên bang đã cho đóng băng tài sản của CHS.\r\n\r\nNhà thờ đã đóng cửa từ ngày 14/3. Bên trong văn phòng vẫn còn một tấm poster quảng bá về giải golf \"Đường đến thiên đàng\" dành cho người nổi tiếng, tổ chức ở Newport Beach vào tháng 1.\r\n\r\nSau khi CHS bị đóng băng tài sản, FBI thu hồi được 4,4 triệu USD từ các tài khoản của cơ sở này. Mô hình đa cấp chủ yếu nhắm đến người lớn tuổi gốc Việt trong khu vực Westminster và San Jose.\r\n\r\n\"Một số nạn nhân có lẽ đã bị lừa hết tài sản\", cơ quan điều tra cho biết. \"Nhiều người giờ đây rơi vào cảnh không còn tiền để trả các chi phí như các khoản vay thế chấp, điện nước, bảo hiểm hay trang trải các chi tiêu thường nhật\".\r\n\r\nSEC mô tả cơ sở của Whitney và Parrish là \"nhà thờ ảo\". Trang mạng của CHS cung cấp đường dẫn đến các kênh YouTube, đăng tải nhiều đoạn video tôn giáo và các đơn cầu nguyện trực tuyến. ', 'Images/Thế giới/Người Việt bốn phương/Art_06.jpg', NULL, NULL, '2019-04-19 12:56:58.000000', NULL, NULL, NULL, NULL, NULL);
INSERT INTO `article` VALUES (7, 'Quốc Cường Gia Lai giải thể công ty con ở TP.HCM', 7, 'Theo văn bản do Sở Giao dịch Chứng khoán TP.HCM (HoSE) công bố, Quốc Cường Gia Lai sẽ giải thể Công ty CP bất động sản Hiệp Phát tại TP.HCM do hoạt động không hiệu quả.', 'Trước đó ngày 29/1, Quốc Cường Gia Lai cũng đã hoàn tất việc chuyển nhượng 49,9% vốn cổ phần tại công ty CP bất động sản Sông Mã.\r\n\r\nNgày 9/1, HĐQT của doanh nghiệp cũng đã ra nghị quyết giảm 195,3 tỷ đồng vốn góp ở Công ty TNHH Bến du thuyền Đà Nẵng.\r\n\r\nViệc Quốc Cường Gia Lai thoái vốn tại hàng loạt các công ty con cho thấy doanh nghiệp đang trong thời kỳ kinh doanh thiếu thuận lợi và muốn giảm quy mô đầu tư.\r\n\r\nĐầu tháng 4/2019, chia sẻ với Zing.vn, bà Nguyễn Thị Như Loan, CEO của Quốc Cường Gia Lai, cho biết nhà có đồng nào, bà đã vét hết cho doanh nghiệp, thậm chí còn vay thêm bạn bè. Nhà, xe đều đã đem đi thế chấp.\r\n\r\nBà Loan cũng khẳng định rằng Quốc Cường Gia Lai đang bước vào thời kỳ rất khó khăn khi cả 12 dự án có diện tích 150 ha bị tạm dừng triển khai.', 'Images/Kinh doanh/Người Việt bốn phương', NULL, NULL, '2019-04-19 12:59:59.000000', NULL, NULL, NULL, NULL, NULL);
INSERT INTO `article` VALUES (8, 'Cần Thơ khai thác tuyến bay quốc tế, có đánh thức miền Tây?', 8, 'Trung tâm Hàng không châu Á - Thái Bình Dương (CAPA) cho rằng sân bay Cần Thơ đang đứng trước cơ hội lớn nếu nhận được sự chú ý của các hãng hàng không trong và ngoài Việt Nam.', 'Theo thông tin từ Sở Giao thông Vận tải TP Cần Thơ, trong khoảng thời gian tháng 3-5/2019, 7 đường bay mới sẽ được đưa vào khai thác tại đây, gồm 2 đường bay quốc tế. \r\n\r\nAirAsia lên kế hoạch sẽ chính thức mở đường bay từ Bangkok (Thái Lan) và Kuala Lumpur (Malaysia) tới thẳng Cần Thơ. Tuyến Cần Thơ - Kuala Lumpur sẽ bay 4 chuyến một tuần từ 8/4 và tuyến Cần Thơ - Bangkok sẽ bay 3 chuyến một tuần từ ngày 2/5.\r\n\r\nTuyến từ Kuala Lumpur sẽ do AirAsia cung ứng, trong khi đó tuyến từ Bangkok sẽ do công ty con của hãng là Thai AirAsia cung ứng.\r\n\r\nViệc AirAsia chính thức mở đường bay quốc tế tới sân bay Cần Thơ cũng như các hãng bay Việt đang muốn nối Cần Thơ ra khu vực đang mang lại cơ hội cho sân bay này.\r\n\r\nTheo thông tin từ Sở Giao thông Vận tải TP Cần Thơ, trong khoảng thời gian tháng 3-5/2019, 7 đường bay mới sẽ được đưa vào khai thác tại đây, gồm 2 đường bay quốc tế. \r\n\r\nAirAsia lên kế hoạch sẽ chính thức mở đường bay từ Bangkok (Thái Lan) và Kuala Lumpur (Malaysia) tới thẳng Cần Thơ. Tuyến Cần Thơ - Kuala Lumpur sẽ bay 4 chuyến một tuần từ 8/4 và tuyến Cần Thơ - Bangkok sẽ bay 3 chuyến một tuần từ ngày 2/5.\r\n\r\nTuyến từ Kuala Lumpur sẽ do AirAsia cung ứng, trong khi đó tuyến từ Bangkok sẽ do công ty con của hãng là Thai AirAsia cung ứng.\r\n\r\nViệc AirAsia chính thức mở đường bay quốc tế tới sân bay Cần Thơ cũng như các hãng bay Việt đang muốn nối Cần Thơ ra khu vực đang mang lại cơ hội cho sân bay này.\r\n\r\n', 'Images/Kinh doanh/Hàng không/Art_08.jpg', NULL, NULL, '2019-04-19 13:03:41.000000', NULL, NULL, NULL, NULL, NULL);
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
-- Records of articlesimages
-- ----------------------------
INSERT INTO `articlesimages` VALUES (1, 1, 'Images/Thời sự/Chính trị/Art_01_01', NULL);
INSERT INTO `articlesimages` VALUES (2, 2, 'Images/Thời sự/Giao thông/Art_02.jpg', 'CSGT bị đâm gục khi đang làm nhiệm vụ trên quốc lộ 21B. ');
INSERT INTO `articlesimages` VALUES (3, 3, 'Images/Pháp luật/Pháp đình/Art_03_01.jpg', 'Tòa cho rằng 1.700 tỷ là tài sản chung của vợ chồng');
INSERT INTO `articlesimages` VALUES (4, 4, 'Images/Pháp luật/Vụ án/Art_04.jpg', NULL);
INSERT INTO `articlesimages` VALUES (5, 5, 'Images/Thế giới/Quân sự/Art_05.jpg', 'Lãnh đạo phe đa số tại Hạ viện Steny Hoyer nói rằng việc luận tội Tổng thống Trump vào thời điểm này là \"không đáng\"');
INSERT INTO `articlesimages` VALUES (6, 6, 'Images/Thế giới/Người Việt bốn phương/Art_06.jpg', NULL);
INSERT INTO `articlesimages` VALUES (7, 7, 'Images/Images/Người Việt bốn phương', NULL);
INSERT INTO `articlesimages` VALUES (8, 8, 'Images/Kinh doanh/Hàng không/Art_08.jpg', NULL);

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
  UNIQUE INDEX `pk_category`(`CatID`) USING BTREE
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
  `Fullname` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `Email` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `DOB` date NULL DEFAULT NULL,
  `AccID` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`EditorID`) USING BTREE,
  UNIQUE INDEX `pk_editor`(`EditorID`) USING BTREE,
  INDEX `fk_editor_account`(`AccID`) USING BTREE,
  INDEX `fk_editor_account1`(`Email`) USING BTREE,
  CONSTRAINT `fk_editor_account` FOREIGN KEY (`AccID`) REFERENCES `account` (`AccID`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `fk_editor_account1` FOREIGN KEY (`Email`) REFERENCES `account` (`Username`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of editor
-- ----------------------------
INSERT INTO `editor` VALUES (1, 'Trần Nguyễn Trâm Anh', 'phuonganh@gmail.com', '2019-04-23', 2);

-- ----------------------------
-- Table structure for rank
-- ----------------------------
DROP TABLE IF EXISTS `rank`;
CREATE TABLE `rank`  (
  `RankID` int(11) NOT NULL AUTO_INCREMENT,
  `RankName` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  PRIMARY KEY (`RankID`) USING BTREE,
  UNIQUE INDEX `pk_rank`(`RankID`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for role
-- ----------------------------
DROP TABLE IF EXISTS `role`;
CREATE TABLE `role`  (
  `RoleID` int(11) NOT NULL AUTO_INCREMENT,
  `RoleName` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  PRIMARY KEY (`RoleID`) USING BTREE,
  UNIQUE INDEX `pk_role`(`RoleID`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of role
-- ----------------------------
INSERT INTO `role` VALUES (1, 'Writer');
INSERT INTO `role` VALUES (2, 'Subscriber');
INSERT INTO `role` VALUES (3, 'Editor');
INSERT INTO `role` VALUES (4, 'Admin');

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
  CONSTRAINT `fk_subcategories_category` FOREIGN KEY (`CatID`) REFERENCES `category` (`CatID`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE = InnoDB AUTO_INCREMENT = 9 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of subcategories
-- ----------------------------
INSERT INTO `subcategories` VALUES (1, 'Chính trị', 1, 1);
INSERT INTO `subcategories` VALUES (2, 'Giao thông', 1, 1);
INSERT INTO `subcategories` VALUES (3, 'Pháp đình', 2, 1);
INSERT INTO `subcategories` VALUES (4, 'Vụ án', 2, 1);
INSERT INTO `subcategories` VALUES (5, 'Quân sự', 3, 1);
INSERT INTO `subcategories` VALUES (6, 'Người Việt bốn phương', 3, 1);
INSERT INTO `subcategories` VALUES (7, 'Bất động sản', 4, 1);
INSERT INTO `subcategories` VALUES (8, 'Hàng không', 4, 1);

-- ----------------------------
-- Table structure for subscriber
-- ----------------------------
DROP TABLE IF EXISTS `subscriber`;
CREATE TABLE `subscriber`  (
  `SubscriberID` int(11) NOT NULL  AUTO_INCREMENT,
  `AccID` int(11) NULL DEFAULT NULL,
  `Fullname` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `Email` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `DOB` date NULL DEFAULT NULL,
  `BoughtOn` datetime(6) NULL DEFAULT NULL,
  `ExpriedOn` datetime(6) NULL DEFAULT NULL,
  PRIMARY KEY (`SubscriberID`) USING BTREE,
  UNIQUE INDEX `pk_subscriber`(`SubscriberID`) USING BTREE,
  INDEX `fk_subscriber_account`(`AccID`) USING BTREE,
  INDEX `fk_subscriber_account1`(`Email`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of subscriber
-- ----------------------------
INSERT INTO `subscriber` VALUES (1, 3, 'Trần Văn Anh', 'hoanhu@gmail.com', '2019-05-15', '2019-04-23 15:07:22.000000', NULL);

-- ----------------------------
-- Table structure for tag
-- ----------------------------
DROP TABLE IF EXISTS `tag`;
CREATE TABLE `tag`  (
  `TagID` int(11) NOT NULL AUTO_INCREMENT,
  `TagName` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  PRIMARY KEY (`TagID`) USING BTREE,
  UNIQUE INDEX `pk_tag`(`TagID`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for writer
-- ----------------------------
DROP TABLE IF EXISTS `writer`;
CREATE TABLE `writer`  (
  `WriterID` int(11) NOT NULL AUTO_INCREMENT,
  `Pseudonym` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL,
  `Fullname` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `Email` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `DOB` date NULL DEFAULT NULL,
  `AccID` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`WriterID`) USING BTREE,
  UNIQUE INDEX `pk_writer`(`WriterID`) USING BTREE,
  INDEX `fk_writer_account`(`AccID`) USING BTREE,
  INDEX `fk_writerr_account1`(`Email`) USING BTREE,
  CONSTRAINT `fk_writer_account` FOREIGN KEY (`AccID`) REFERENCES `account` (`AccID`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `fk_writerr_account1` FOREIGN KEY (`Email`) REFERENCES `account` (`Username`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of writer
-- ----------------------------
INSERT INTO `writer` VALUES (1, 'hoameo', 'Trần Thị Kim Hiền', 'kimhienit16@gmail.com', '2019-04-23', 1);

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
