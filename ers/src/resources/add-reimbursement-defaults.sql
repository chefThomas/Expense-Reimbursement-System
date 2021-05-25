alter table reimbursement alter status_id set default (1);

alter table reimbursement alter submitted set default now();