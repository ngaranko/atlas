#!/bin/bash

# Often runs out of memory:
# ./node_modules/.bin/cypress run --env \
# "USERNAME_EMPLOYEE=$USERNAME_EMPLOYEE,"\
# "USERNAME_EMPLOYEE_PLUS=$USERNAME_EMPLOYEE_PLUS,"\
# "PASSWORD_EMPLOYEE=$PASSWORD_EMPLOYEE,"\
# "PASSWORD_EMPLOYEE_PLUS=$PASSWORD_EMPLOYEE_PLUS"

node ./scripts/cypress-run-isolated.js
