drop table if exists clients-file;

create table 
  clients-file (
    id bigint primary key generated always as identity not null,
    created_at timestamptz default now() not null,
    departments text not null default '',
    emails text not null default '',
    subject text not null default '',
    rowsort text not null default '',
    cc_email text not null default '',
    columnsort text not null default '',
    login_filter text not null default '',
    completion_filter text not null default '',
    remove_button text not null default '',
    course_type_only text not null default '',
    ple_only text not null default '',
    summary_only text not null default '',
  );