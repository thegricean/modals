#!/bin/bash

DIR="/Users/titlis/webprojects/70_modals_comprehension_evidence/"

cd $MTURK_CMD_HOME/bin

./approveWork.sh -successfile ${DIR}/modals.success
