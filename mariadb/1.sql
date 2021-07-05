CREATE DATABASE link DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;

create table link.member
(
	num int unsigned auto_increment
		primary key,
	name varchar(100) not null,
	tel varchar(100) not null,
	id varchar(100) null,
	pw varchar(200) null,
	birth varchar(50) null,
	email varchar(200) null,
	add_tel varchar(100) null,
	company_num varchar(200) null,
	company_pos varchar(200) null,
	addr varchar(200) null,
	addr_detail varchar(200) null,
	nickname varchar(100) null,
	profile_img_num varchar(100) null,
	auto_login varchar(300) null,
	otp_key varchar(100) null,
	reg_date datetime null,
	udt_date datetime null,
	type tinyint default 2 null,
	status tinyint default 2 null,
	info_tel tinyint default 1 null,
	info_birth tinyint default 1 null,
	info_addr tinyint default 1 null,
	alarm_type tinyint default 1 null
)
charset=utf8;

create index id
	on link.member (id);

create index status
	on link.member (status);

create index tel
	on link.member (tel);

