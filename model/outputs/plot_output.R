library(ggplot2)
library(reshape2)
library(plyr)
source("~/Dropbox/Work/Grad_school/Research/Utilities/summarySE.R")



beliefs <- read.csv("rain-beliefs.csv")
beliefs.listener <- subset(beliefs, type=="listener_belief")
ggplot(beliefs.listener, aes(x=utterance, y=probability)) +
  geom_bar(stat="identity", color="black", fill="gray") +
  theme_bw() +
  ylim(c(0, 0.8)) +
  ylab("Probability") +
  xlab("Utterance")

beliefs.speaker <- subset(beliefs, type=="speaker_belief")
ggplot(beliefs.speaker, aes(x=utterance, y=probability)) +
  geom_bar(stat="identity", color="black", fill="gray") +
  theme_bw() +
  ylim(c(0, 0.8)) +
  ylab("Probability") +
  xlab("Utterance")

evidence <- read.csv("rain-evidence.csv")
evidence$evidenceType <- factor(evidence$evidenceType, levels=c("direct", "strong-inferential", "weak-inferential", "report"))
ggplot(evidence, aes(x=utterance, y=prob_normed, fill=evidenceType)) +
  geom_bar(stat="identity", color="black", position=position_dodge()) +
  theme_bw() +
  scale_fill_manual(values=c("#023858", "#1d91c0", "#7fcdbb", "#ffffcc"), name="Evidence type") +
  xlab("Utterance") +
  ylab("Probability")
