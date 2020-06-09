insert into auth (username, password)
values
($1, $2)
returning *;