library(ggplot2)
library(reshape2)
library(plyr)
source("~/Dropbox/Work/Grad_school/Research/Utilities/summarySE.R")



beliefs <- read.csv("rain-beliefs.csv")
beliefs$utterance <- factor(beliefs$utterance, levels=c("bare", "must", "might"))
ggplot(beliefs, aes(x=type, y=probability)) +
  geom_bar(stat="identity", color="black", fill="gray") +
  #geom_point() +
  theme_bw() +
  ylim(c(0, 0.8)) +
  ylab("Probability") +
  xlab("Belief type") +
  facet_grid(.~utterance)

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
evidence$utterance <- factor(evidence$utterance, levels=c("bare", "must", "might"))
evidence$evidence <- factor(evidence$evidence, levels=c("pos-strong", "pos-mod", "pos-weak"), labels=c("strong", "mod", "weak"))
ggplot(evidence, aes(x=evidence, y=probability)) +
  geom_bar(stat="identity", color="black", fill="gray") +
  theme_bw() +
  facet_grid(.~utterance) +
  scale_fill_manual(values=c("#023858", "#1d91c0", "#7fcdbb", "#ffffcc"), name="Evidence type") +
  xlab("Evidence type") +
  ylab("Probability")
