#!/bin/bash

DIR="/Users/titlis/cogsci/projects/stanford/projects/modals/modals/experiments/80_modals_comprehension_speakerbelief/"

cd $MTURK_CMD_HOME/bin

./approveWork.sh -successfile ${DIR}/modals.success
