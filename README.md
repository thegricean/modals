modals
======

A collection of stuff related to necessity modals that might develop into a real project at some point

tgrep2_search/results/bncs.tab contains the results (19437 cases) of a tgrep2 search on the spoken BNC for necessity modals as specified in the @MODAL macro in tgrep2_search/MACROS.ptn

@MODAL search pattern:
(* !>> @DISFL < must | < (have|had|has . to) | < (have|has . (got . to)))

Results database currently contains unique ID, two lines of previous context, the sentence containing the modal, a column coding whether the modal is must/have to/have got to, a column coding whether (for the non-must cases) the form is third-person-sg/past tense/other, and the POS of the modal as annotated in the corpus (this was the beginning of an attempt to extract the verbs following the modals, to see whether there are any interesting differences).
