#!/bin/bash

DIR="/Users/titlis/webprojects/72_modals_comprehension_evidence_room/"

cd $MTURK_CMD_HOME/bin

./approveWork.sh -successfile ${DIR}/modals.success
