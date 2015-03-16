#!/bin/bash

for FILENAME in $(ls /Users/justinek/Dropbox/Work/Grad_school/Research/hyperbolicmodals/modals/model/model_fits_outputs)
do
	python parseOutput_evidence.py /Users/justinek/Dropbox/Work/Grad_school/Research/hyperbolicmodals/modals/model/model_fits_outputs/$FILENAME > /Users/justinek/Dropbox/Work/Grad_school/Research/hyperbolicmodals/modals/model/model_fits_outputs_parsed/$FILENAME
done
