#!/usr/bin/env sh
pushd /Users/titlis/aws-mturk-clt-1.3.1/bin
./loadHITs.sh $1 $2 $3 $4 $5 $6 $7 $8 $9 -label /Users/titlis/webprojects/68_modals_freeproduction//modals_freeproduction -input /Users/titlis/webprojects/68_modals_freeproduction//modals_freeproduction.input -question /Users/titlis/webprojects/68_modals_freeproduction//modals_freeproduction.question -properties /Users/titlis/webprojects/68_modals_freeproduction//modals_freeproduction.properties -maxhits 1
popd