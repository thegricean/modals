#!/bin/bash

for FILENAME in $(ls /Users/justinek/Dropbox/Work/Grad_school/Research/hyperbolicmodals/modals/model/model_fits)
do
	node test/run_sandbox.js /Users/justinek/Dropbox/Work/Grad_school/Research/hyperbolicmodals/modals/model/model_fits/$FILENAME > /Users/justinek/Dropbox/Work/Grad_school/Research/hyperbolicmodals/modals/model/model_fits_outputs/$FILENAME
done

