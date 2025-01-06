create table produto(
id bigint not null auto_increment,
nome varchar(100) not null,
categoria varchar(100) not null,
quantidade tinyint not null,
valor float not null,
data date not null,

primary key (id)
);