-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 08, 2023 at 10:33 AM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `qlks`
--

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

CREATE TABLE `admins` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `admins`
--

INSERT INTO `admins` (`id`, `name`, `password`) VALUES
(3, 'tuntran', '$2a$10$Iin6LyB0FAXY/WUm39y59.uckSXfzwxJ7r7xnHilKYd87wr7nkvK6'),
(6, 'pkhanh', '$2a$10$MLToUJtEdDHd/UFlUTA.d.savMlP3OvQuHDa/Hk2sosao3TR/OOO.'),
(9, 'user1', '$2a$10$K/K8RaS35bnUqI6p5vGacekUKcVIk7oZ0u59nn6VWBgaA1z1rpOXG');

-- --------------------------------------------------------

--
-- Table structure for table `bookings`
--

CREATE TABLE `bookings` (
  `id` int(11) NOT NULL,
  `room_id` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `admin_id` int(11) DEFAULT NULL,
  `room_name` varchar(50) NOT NULL,
  `checkin_date` date NOT NULL,
  `checkout_date` date NOT NULL,
  `guest_name` varchar(255) NOT NULL,
  `guest_email` varchar(255) NOT NULL,
  `guest_phone` varchar(20) NOT NULL,
  `guest_mess` varchar(255) NOT NULL,
  `total_stay` varchar(50) NOT NULL,
  `total_guests` varchar(50) NOT NULL,
  `total_price` decimal(10,2) DEFAULT 0.00,
  `status` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `bookings`
--

INSERT INTO `bookings` (`id`, `room_id`, `customer_id`, `admin_id`, `room_name`, `checkin_date`, `checkout_date`, `guest_name`, `guest_email`, `guest_phone`, `guest_mess`, `total_stay`, `total_guests`, `total_price`, `status`) VALUES
(107, 21, 18, NULL, 'Upper Deluxe', '2023-04-27', '2023-04-29', 'Tran Quoc Tuan', 'kienquann@gmail.com', '0961818762', '2', '3 ngày 2 đêm', '1 người lớn 4 trẻ em', '8580000.00', 4),
(108, 24, 18, NULL, 'Chill Out', '2023-04-27', '2023-04-29', 'Tran Quoc Tuan', 'ysuo@gmail.com', '0961818762', '3', '3 ngày 2 đêm', '1 người lớn 3 trẻ em', '22110000.00', 1),
(109, 23, 18, NULL, 'Family', '2023-04-27', '2023-04-29', 'Tran Quoc Tuan', 'ysuo@gmail.com', '0961818762', '4', '3 ngày 2 đêm', '2 người lớn 4 trẻ em', '11893200.00', 1),
(110, 22, 18, NULL, 'President Suite', '2023-04-27', '2023-04-29', 'Tran Quoc Tuan', 'thanhthuy@gmail.com', '0961818762', '5', '3 ngày 2 đêm', '1 người lớn 4 trẻ em', '18150000.00', 1),
(135, 19, 18, NULL, 'Roof Top', '2023-04-27', '2023-04-29', 'Tran Quoc Tuan', 'kienquann@gmail.com', '0961818762', 'test', '3 ngày 2 đêm', '1 người lớn 3 trẻ em', '10560000.00', 4),
(144, 21, 18, NULL, 'Upper Deluxe', '2023-05-04', '2023-05-06', 'Tran Quoc Tuan', 'pk@gmail.com', '0961818762', '123', '3 ngày 2 đêm', '2 người lớn 3 trẻ em', '8580000.00', 4);

-- --------------------------------------------------------

--
-- Table structure for table `channels`
--

CREATE TABLE `channels` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `channel_id` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `channels`
--

INSERT INTO `channels` (`id`, `name`, `channel_id`) VALUES
(1, 'MCK', 'UC8EB7c0E_TS4tpTQwMtv6fw'),
(2, 'Chillies', 'UCLOCzuU5ddDqvd_e3qpomZQ'),
(3, 'Binz', 'UC0IpGYsi1KVorZ7QVCHfdag'),
(4, 'Sơn Tùng MTP', 'UClyA28-01x4z60eWQ2kiNbA'),
(5, 'Hoàng Dũng', 'UCZzKnnb8ENdw1AFrK8xLDDg'),
(6, 'Vũ', 'UCePWSQHSdXqzQlzyJfwY1Jg'),
(7, 'Justatee', 'UC_Eqg-tBPUUvA0heBZfdu6Q'),
(8, 'Đen vâu', 'UCWu91J5KWEj1bQhCBuGeJxw'),
(9, 'Phan Mạnh Quỳnh', 'UCQ7d2lO-qGUy6wwM4n3KHfw'),
(10, 'QNT', 'UCaw0M6QnIvFeONPBBtqKlWg'),
(11, 'Soobin Hoàng Sơn', 'UCpVvunMbMvVj9DgCiOSBdcg'),
(12, 'The Weeknd', 'UC0WP5P-ufpRfjbNrmOWwLBQ'),
(13, 'SpaceSpeakers', 'UCOWm9GI64rpikvexym1QSTA');

-- --------------------------------------------------------

--
-- Table structure for table `contacts`
--

CREATE TABLE `contacts` (
  `id` int(11) NOT NULL,
  `hotel_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `message` text DEFAULT NULL,
  `disabled` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `contacts`
--

INSERT INTO `contacts` (`id`, `hotel_id`, `name`, `email`, `phone`, `message`, `disabled`) VALUES
(1, 1, 'Trần Quốc Tuấn', 'tuantrann@gmail.com', '0961818762', 'hehe', 0),
(10, 1, 'phamtt', 'phamtt@gmail.com', '0967878787', 'haha', 0),
(11, 1, 'Tran Quoc Tuan', 'kienquann@gmail.com', '0961818762', 'hah', 0),
(12, 1, 'Tran Quoc Tuan', 'thanhthuy@gmail.com', '0961818762', 'haa', 1),
(13, 1, 'Tran Quoc Tuan', 'ysuo@gmail.com', '0961818762', 'haha', 1);

-- --------------------------------------------------------

--
-- Table structure for table `cuisines`
--

CREATE TABLE `cuisines` (
  `id` int(11) NOT NULL,
  `hotel_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` varchar(1000) NOT NULL,
  `opening_time` time NOT NULL,
  `closing_time` time NOT NULL,
  `img_slider` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT '["","","","",""]' CHECK (json_valid(`img_slider`)),
  `disabled` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `cuisines`
--

INSERT INTO `cuisines` (`id`, `hotel_id`, `name`, `description`, `opening_time`, `closing_time`, `img_slider`, `disabled`) VALUES
(1, 1, 'Nhà hàng', 'Không chỉ ở lối kiến ​​trúc, ẩm thực của nhà hàng cũng mang đậm nét truyền thống Việt Nam từ những món ăn dân dã dân dã đến hải sản, đặc sản. Qua bàn tay chế biến tài hoa của các đầu bếp, Ẩm Thực Truyền Thống Việt Nam luôn mang đến cho thực khách những trải nghiệm mới lạ, nhưng vẫn giữ được cái “chất” của hương vị Việt.', '08:00:00', '21:30:00', '[\"https://images.unsplash.com/photo-1467003909585-2f8a72700288?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80\",\"https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80\",\"https://images.unsplash.com/photo-1484723091739-30a097e8f929?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=449&q=80\",\"https://images.unsplash.com/photo-1499028344343-cd173ffc68a9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80\",\"https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80\"]', 0),
(4, 1, 'Nghệ thuật nấu ăn', 'Chắc chắn chúng ta đã nghe thấy rất nhiều câu nói \"nấu ăn là một nghệ thuật và người đầu bếp là một nghệ sĩ\" với hàm ý tôn vinh nghề bếp. Tuy nhiên nghệ thuật nấu ăn được nói đến ở đây có nội hàm sâu sắc hơn rất nhiều. Ẩm thực của mỗi quốc gia luôn có những nét đặc trưng phù hợp với cơ thể con người, cuộc sống, khí hậu, nguồn thực phẩm, điều kiện tự nhiên ở nơi đó. Hay nói cách khác, nghệ thuật ẩm thực là việc sử dụng các nguyên liệu tự nhiên chế biến thành thức ăn phù hợp với sự tồn tại của con người trong khí hậu nơi đó.', '10:00:00', '22:00:00', '[\"https://i.pinimg.com/564x/ab/21/9b/ab219bd22c0c396b77b988b40783e3ad.jpg\",\"https://i.pinimg.com/564x/c0/81/31/c08131d956d873fe9f9251c4e07a10f2.jpg\",\"https://i.pinimg.com/564x/db/0a/4c/db0a4cd667cca6b8da0a529b4adf3a4f.jpg\",\"https://i.pinimg.com/564x/2b/ab/83/2bab83d8ff6c5a0bd683afb4d296e162.jpg\",\"https://i.pinimg.com/564x/e5/1c/04/e51c040a0f0aef042086e6952eb63cf4.jpg\"]', 1);

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

CREATE TABLE `customers` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(100) NOT NULL DEFAULT '""',
  `address` varchar(500) NOT NULL DEFAULT '""',
  `disabled` tinyint(4) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `customers`
--

INSERT INTO `customers` (`id`, `email`, `name`, `password`, `phone`, `address`, `disabled`) VALUES
(18, 'tuantran789@gmail.com', 'Tran Quoc Tuan', '$2a$10$b2lbyTiM5eT1uWaNPdgSXu.c/wwsMy9PqYWNE.Ge4DkfA3irWpaAO', '0961818762', '40/1/12/6 phuong Hiep Thanh', 0),
(32, 'user1@gmail.com', 'user12', '$2a$10$QMDFk5efTQqVosYLg1pJDukj93Ptnv/LgRGYW6NnfsEMCe/7lbYRy', '', '', 1),
(37, 'test25@gmail.com', 'test25', '$2a$10$Z47NMNfYFygCzU6sdx2dD.gEzblYkoERHch.bi6DsIPp3DzC4AiCi', '', '', 1),
(38, 'ccc@gmail.com', 'ccc', '$2a$10$rnpokS5PbSgFjqxrM723NeYYXT/oc.G/u58tqpM6b8ykuR8QrDNlG', '', '', 0),
(39, 'user123@gmail.com', 'user123', '$2a$10$ur8H1Nbndlwzk2AsWMqJeecY.yoHRSIdCuqvP/EwwY.SIhM.2Btv.', '', '', 0),
(42, 'haha@gmail.com', 'haha', '$2a$10$YujvBitgQpRib1WSDVfHSeCxaLCJmrVsjE2NWnfYZExJc6E/GdP5.', '\"\"', '\"\"', 0);

-- --------------------------------------------------------

--
-- Table structure for table `faqs`
--

CREATE TABLE `faqs` (
  `id` int(11) NOT NULL,
  `hotel_id` int(11) NOT NULL,
  `question` text DEFAULT NULL,
  `answer` text DEFAULT NULL,
  `disabled` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `faqs`
--

INSERT INTO `faqs` (`id`, `hotel_id`, `question`, `answer`, `disabled`) VALUES
(4, 1, 'Nhà nghỉ khách sạn có máy nước nóng lạnh không?', 'Có', 0),
(8, 1, 'Nhà nghỉ khách sạn có hồ bơi không ?', 'Đương nhiên là khách sạn của chúng tôi có rồi!!!!!', 1);

-- --------------------------------------------------------

--
-- Table structure for table `hotel`
--

CREATE TABLE `hotel` (
  `id` int(11) NOT NULL,
  `admin_id` int(11) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `address` text NOT NULL,
  `phone` varchar(20) NOT NULL,
  `email` varchar(255) NOT NULL,
  `slider_home` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT '["", "", ""]' CHECK (json_valid(`slider_home`)),
  `slider_ins` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT '\'["", "", "", "", "", "", "",""]\'',
  `src_ggmap` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `hotel`
--

INSERT INTO `hotel` (`id`, `admin_id`, `name`, `description`, `address`, `phone`, `email`, `slider_home`, `slider_ins`, `src_ggmap`) VALUES
(1, 9, 'Khách sạn Kim Tuyếnnn', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. ', '102/6/1 - quận 12 - Tp.HCM', '0967778889', 'kimtuyennhotel13@gmail.com', '[\"https://robinresort.webhotel.vn/files/images/bn/ngoi-nha-an-nap-trong-nui-rung-2.jpg\",\"https://furamahotel.webhotel.vn/files/images/banner/24.jpg\",\"https://furamahotel.webhotel.vn/files/images/banner/bn7.jpg\"]', '[\"https://steamuserimages-a.akamaihd.net/ugc/941699520639318064/B30FDC786E112747191946B2E3C783731F810FA0/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=#000000&letterbox=false\",\"https://steamuserimages-a.akamaihd.net/ugc/1741223858273953590/B28F793E8708841DB5D9A76DB3A17077C01B29C7/?imw=637&imh=358&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=true\",\"https://steamuserimages-a.akamaihd.net/ugc/1688276024726642685/338AD437D9538E46D49C3FC8C9D2185A52317538/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false\",\"https://steamuserimages-a.akamaihd.net/ugc/1687145409420611112/7B585F0B614EDC28D45185A6675B1388BD857D6E/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=#000000&letterbox=false\",\"https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/549e9b77-4c90-4c7f-8d0e-772a4ba70576/d67owr1-cd997d1c-914d-4d43-9d5a-07a21fea331e.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzU0OWU5Yjc3LTRjOTAtNGM3Zi04ZDBlLTc3MmE0YmE3MDU3NlwvZDY3b3dyMS1jZDk5N2QxYy05MTRkLTRkNDMtOWQ1YS0wN2EyMWZlYTMzMWUuZ2lmIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.bMBcmtDmanbMG4ulMGCoDZkeWtmadgDA4RfVWP9j0C0\",\"https://i.pinimg.com/originals/03/2d/5a/032d5aeb40f1e792fedcafe881c23a1c.gif\",\"https://i.pinimg.com/originals/cc/6c/fc/cc6cfc591c0d780ed130b72aa12b9212.gif\",\"https://i.pinimg.com/originals/51/a3/ec/51a3ecf688d5fc706e041e2830b77bb7.gif\"]', 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.35266908251!2d106.64444691462332!3d10.860758192264358!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317529ec479346ef%3A0x8fec6164654e4497!2sHotel%20Kim%20Tuy%E1%BA%BFn!5e0!3m2!1svi!2s!4v1680787614682!5m2!1svi!2s');

-- --------------------------------------------------------

--
-- Table structure for table `rooms`
--

CREATE TABLE `rooms` (
  `id` int(11) NOT NULL,
  `hotel_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `discount` decimal(10,2) NOT NULL,
  `quantity` int(11) NOT NULL DEFAULT 0,
  `disabled` tinyint(1) NOT NULL DEFAULT 0,
  `area` varchar(50) DEFAULT NULL,
  `view_direction` varchar(50) DEFAULT NULL,
  `bed_type` varchar(50) DEFAULT NULL,
  `avatar` text NOT NULL DEFAULT '""',
  `avatar_2` longtext NOT NULL DEFAULT '""',
  `img_slider` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT '\'["","","","",""]\''
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `rooms`
--

INSERT INTO `rooms` (`id`, `hotel_id`, `name`, `description`, `price`, `discount`, `quantity`, `disabled`, `area`, `view_direction`, `bed_type`, `avatar`, `avatar_2`, `img_slider`) VALUES
(19, 1, 'Roof Topp', 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English. ', '3210000.00', '10.00', 10, 0, '30m2', 'hướng mặt trời', 'woodd', '/rooms_img/roof_top_img/roof_top-1680291707690.jpg', 'https://www.hoteldesartssaigon.com/wp-content/uploads/sites/92/2019/02/Social-Club-Rooftop1.jpg', '[\"https://plus.unsplash.com/premium_photo-1676667572811-7eb187fe754c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80\",\"https://images.unsplash.com/photo-1506102383123-c8ef1e872756?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80\",\"https://plus.unsplash.com/premium_photo-1673466856699-63939d1f8cf3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80\",\"https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332&q=80\",\"https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80\"]'),
(20, 1, 'Deluxe Sky', 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English. ', '2300000.00', '0.00', 0, 0, '10m2', 'hướng biển', 'twin', '/rooms_img/deluxe_sky_img/deluxe_sky-1680201212259.avif', 'https://vibooking.vn/wp-content/uploads/2019/07/Flamingo-%C4%90%E1%BA%A1i-L%E1%BA%A3i-Forest-In-The-Sky-2-870x555.jpg', '[\"https://images.unsplash.com/photo-1464660439080-b79116909ce7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1202&q=80\",\"https://images.unsplash.com/photo-1465577512280-1c2d41a79862?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1147&q=80\",\"https://images.unsplash.com/photo-1532891111173-366d1cf038a7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80\",\"https://images.unsplash.com/photo-1532891111173-366d1cf038a7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fHN1bnNoaW5lfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60\",\"https://plus.unsplash.com/premium_photo-1674086603434-2014d5b61024?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=775&q=80\"]'),
(21, 1, 'Upper Deluxe', 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don\'t look even slightly believable.', '2600000.00', '0.00', 5, 0, '15m2', 'hướng mặt tiền', 'soft', '/rooms_img/upper_deluxe_img/upper_deluxe-1680620390815.avif', 'https://paoshotel.com/files/images/Room/upper/Double_2.jpg', '[\"https://images.unsplash.com/photo-1490750967868-88aa4486c946?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80\",\"https://plus.unsplash.com/premium_photo-1676977396527-96db41f59b22?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80\",\"https://plus.unsplash.com/premium_photo-1661266884360-028764df3128?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80\",\"https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1174&q=80\",\"https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80\"]'),
(22, 1, 'President Suite', 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. ', '5500000.00', '0.00', 0, 0, '20m2', 'hướng biển', 'double', '/rooms_img/president_suite_img/president_suite-1680182563228.avif', 'https://www.caravellehotel.com/wp-content/uploads/Caravelle-Saigon-Presidential-Suite-1.jpg', '[\"https://steamuserimages-a.akamaihd.net/ugc/1688276024726601533/33AA3712CB63E4BCC229C2CFDA6C70E69C7C41D0/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false\",\"https://steamuserimages-a.akamaihd.net/ugc/803240690804401041/1902BE496F3D55F3669598A1B629F3CC286CDEA3/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false\",\"https://steamuserimages-a.akamaihd.net/ugc/957479470583106555/85D1909796D8DA26B48D88901ABE007140F939BC/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false\",\"https://steamuserimages-a.akamaihd.net/ugc/996890407484229469/2B9249C7B62BA89EFDC8A0703FE1081CE253AA9F/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false\",\"https://steamuserimages-a.akamaihd.net/ugc/925930172367319736/F05F8723403E6C03B125B689D3897206AC8A309A/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false\"]'),
(23, 1, 'Family', 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don\'t look even slightly believable.', '3604000.00', '0.00', 0, 0, '30m2', 'hướng vườn', 'twin and soft', '/rooms_img/family_img/family-1680200088664.avif', 'https://family-hanoi-hotel.hotelmix.vn/data/Photos/r1536x522/8288/828896/828896366/Family-Hanoi-Hotel-Exterior.JPEG', '[\"https://steamuserimages-a.akamaihd.net/ugc/942826282216145561/2DC0B41F44FB492E6AACA40B5701E9510804F7F2/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false\",\"https://steamuserimages-a.akamaihd.net/ugc/1729920079238836956/69CB0B3A3983D596F495D3135F04C2B749339103/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false\",\"https://steamuserimages-a.akamaihd.net/ugc/1697255428451708173/0841D6FDE7B3DE92DCE3D13245B44B73D83D5A6A/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false\",\"https://steamuserimages-a.akamaihd.net/ugc/860609382668516623/AE8560D56DEFAC6C84D256FAF0A087AEDDEDA309/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false\",\"https://steamuserimages-a.akamaihd.net/ugc/2058745292928032697/E0EA83B51D2F073CD14367862F4030ED8D302464/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false\"]'),
(24, 1, 'Chill Out', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. ', '6700000.00', '0.00', 6, 0, '35m2', 'hướng chill', 'chillnfree', '/rooms_img/chill_out_img/chill_out-1680182881667.avif', 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/303626726.jpg?k=7e8fdf091c863bb00dc54ed2e9b17afaa71b340b9c716eaf5092edf8cb32e106&o=&hp=1', '[\"https://images.unsplash.com/photo-1448375240586-882707db888b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80\",\"https://images.unsplash.com/photo-1425913397330-cf8af2ff40a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80\",\"https://images.unsplash.com/photo-1473448912268-2022ce9509d8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1141&q=80\",\"https://images.unsplash.com/photo-1511497584788-876760111969?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332&q=80\",\"https://images.unsplash.com/photo-1470115636492-6d2b56f9146d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80\"]'),
(26, 1, 'Messi Goatt', 'siiuuuuuuuuuuuuu', '10000000.00', '0.00', 1, 0, '50m2', 'hướng world cup', 'hattrickk', '/rooms_img/messi_goat_img/messi_goat-1680418328474.jpg', 'https://library.sportingnews.com/styles/crop_style_16_9_desktop_webp/s3/2022-12/Lionel%20Messi%20-%20World%20Cup%20Final%202022%20penalty%20celebration%20vs%20France%20-%20181222-16x9.jpg.webp?itok=VSk6gUGD', '[\"https://cdn.bongdaplus.vn/Assets/Media/2023/04/04/76/messi-barca.png\",\"https://i1-thethao.vnecdn.net/2022/12/19/fkscvpyvqaa1fv9-jfif-167139012-9444-5939-1671391905.jpg?w=1020&h=0&q=100&dpr=1&fit=crop&s=dgiI4O7UHFlh0xZra6U9qw\",\"https://file3.qdnd.vn/data/images/0/2022/11/15/hieu_tv/messi%201.jpg?dpi=150&quality=100&w=870\",\"https://i1-thethao.vnecdn.net/2022/12/10/messi-3-jpeg-1670629980-167062-7567-4192-1670631569.jpg?w=1020&h=0&q=100&dpr=1&fit=crop&s=YpSwgUv-qfNjVhuZCtq-yw\",\"https://steamuserimages-a.akamaihd.net/ugc/1688248453399819488/95C026ED817FAE5DB9759DEB7BCA1D3046F71F59/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false\"]');

-- --------------------------------------------------------

--
-- Table structure for table `services`
--

CREATE TABLE `services` (
  `id` int(11) NOT NULL,
  `hotel_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` varchar(1000) NOT NULL,
  `opening_time` time NOT NULL,
  `closing_time` time NOT NULL,
  `img_slider` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT '["","","","",""]' CHECK (json_valid(`img_slider`)),
  `disabled` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `services`
--

INSERT INTO `services` (`id`, `hotel_id`, `name`, `description`, `opening_time`, `closing_time`, `img_slider`, `disabled`) VALUES
(1, 1, 'Spa', 'Lạc vào Spa Kim Tuyen Hotel sang trọng và quyến rũ để tận hưởng những phút giây thư giãn tuyệt đối giữa không gian thiên nhiên. Tại đây, bạn có thể đắm mình trong những trải nghiệm spa độc đáo, được chắt lọc từ những tinh hoa nghệ thuật của phương Đông và phương Tây. Spa Furama Resort là nơi tôn vinh cái đẹp, là thiên đường của nghỉ dưỡng và hưởng thụ.', '08:00:00', '20:00:00', '[\"https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80\",\"https://images.unsplash.com/photo-1600334129128-685c5582fd35?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80\",\"https://images.unsplash.com/photo-1507652313519-d4e9174996dd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80\",\"https://images.unsplash.com/photo-1596178060671-7a80dc8059ea?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80\",\"https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80\"]', 1),
(2, 1, 'Yoga', 'Khách nghỉ tại Kim Tuyen Hotel có thể tham gia lớp học Yoga của khách sạn để thư giãn tâm hồn và lấy lại cân bằng trước khi bắt đầu một ngày mới.', '07:30:00', '22:00:00', '[\"https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=499&q=80\",\"https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1220&q=80\",\"https://plus.unsplash.com/premium_photo-1679596990572-9af483a16253?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80\",\"https://images.unsplash.com/photo-1616699002805-0741e1e4a9c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80\",\"https://images.unsplash.com/photo-1608404862898-ca7de5c2eb4a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80\"]', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `bookings`
--
ALTER TABLE `bookings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_bookings_rooms` (`room_id`),
  ADD KEY `fk_bookings_customers` (`customer_id`),
  ADD KEY `fk_admins_bookings` (`admin_id`);

--
-- Indexes for table `channels`
--
ALTER TABLE `channels`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `contacts`
--
ALTER TABLE `contacts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_contact_hotels` (`hotel_id`);

--
-- Indexes for table `cuisines`
--
ALTER TABLE `cuisines`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_cuisine_hotel` (`hotel_id`);

--
-- Indexes for table `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `faqs`
--
ALTER TABLE `faqs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_faq_hotel` (`hotel_id`);

--
-- Indexes for table `hotel`
--
ALTER TABLE `hotel`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_admins_hotels` (`admin_id`);

--
-- Indexes for table `rooms`
--
ALTER TABLE `rooms`
  ADD PRIMARY KEY (`id`),
  ADD KEY `rooms_ibfk_1` (`hotel_id`);

--
-- Indexes for table `services`
--
ALTER TABLE `services`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_service_hotel` (`hotel_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admins`
--
ALTER TABLE `admins`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `bookings`
--
ALTER TABLE `bookings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=145;

--
-- AUTO_INCREMENT for table `channels`
--
ALTER TABLE `channels`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `contacts`
--
ALTER TABLE `contacts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `cuisines`
--
ALTER TABLE `cuisines`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `customers`
--
ALTER TABLE `customers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT for table `faqs`
--
ALTER TABLE `faqs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `hotel`
--
ALTER TABLE `hotel`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `rooms`
--
ALTER TABLE `rooms`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- AUTO_INCREMENT for table `services`
--
ALTER TABLE `services`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `bookings`
--
ALTER TABLE `bookings`
  ADD CONSTRAINT `fk_admins_bookings` FOREIGN KEY (`admin_id`) REFERENCES `admins` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_bookings_customers` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_bookings_rooms` FOREIGN KEY (`room_id`) REFERENCES `rooms` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `contacts`
--
ALTER TABLE `contacts`
  ADD CONSTRAINT `fk_contact_hotels` FOREIGN KEY (`hotel_id`) REFERENCES `hotel` (`id`);

--
-- Constraints for table `cuisines`
--
ALTER TABLE `cuisines`
  ADD CONSTRAINT `fk_cuisine_hotel` FOREIGN KEY (`hotel_id`) REFERENCES `hotel` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `faqs`
--
ALTER TABLE `faqs`
  ADD CONSTRAINT `fk_faq_hotel` FOREIGN KEY (`hotel_id`) REFERENCES `hotel` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `hotel`
--
ALTER TABLE `hotel`
  ADD CONSTRAINT `fk_admins_hotels` FOREIGN KEY (`admin_id`) REFERENCES `admins` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `rooms`
--
ALTER TABLE `rooms`
  ADD CONSTRAINT `rooms_ibfk_1` FOREIGN KEY (`hotel_id`) REFERENCES `hotel` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `services`
--
ALTER TABLE `services`
  ADD CONSTRAINT `fk_service_hotel` FOREIGN KEY (`hotel_id`) REFERENCES `hotel` (`id`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
