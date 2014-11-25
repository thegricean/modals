#!/usr/bin/env sh
pushd /Applications/aws-mturk-clt-1.3.0/bin
./loadHITs.sh $1 $2 $3 $4 $5 $6 $7 $8 $9 -label /Users/justinek/Dropbox/Work/Grad_school/Research/hyperbolicmodals/mturkscripts/launch//rain -input /Users/justinek/Dropbox/Work/Grad_school/Research/hyperbolicmodals/mturkscripts/launch//rain.input -question /Users/justinek/Dropbox/Work/Grad_school/Research/hyperbolicmodals/mturkscripts/launch//rain.question -properties /Users/justinek/Dropbox/Work/Grad_school/Research/hyperbolicmodals/mturkscripts/launch//rain.properties -maxhits 1
popd