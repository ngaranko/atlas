#!/bin/bash
# TODO remove

PATH=./node_modules/.bin/:$PATH

cypress open --env \
"USERNAME_EMPLOYEE=$USERNAME_EMPLOYEE,"\
"USERNAME_EMPLOYEE_PLUS=$USERNAME_EMPLOYEE_PLUS,"\
"PASSWORD_EMPLOYEE=$PASSWORD_EMPLOYEE,"\
"PASSWORD_EMPLOYEE_PLUS=$PASSWORD_EMPLOYEE_PLUS"
