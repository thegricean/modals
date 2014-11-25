library(ggplot2)
library(reshape2)
library(plyr)
source("~/Dropbox/Work/Grad_school/Research/Utilities/summarySE.R")

d <- read.csv("../data/rain_long.csv")
d$sentenceType <- factor(d$sentenceType, levels=c("bare", "necessary", "likely", "possible"), labels=c("bare", "must", "probably", "might"))
d.melt <- melt(data=d, id.vars=c("workerID", "gender", "age", "income", "language", "order", "sentenceType"),
               measure.vars=c("probRain", "evidence"))
colnames(d.melt)[8] <- "question"
colnames(d.melt)[9] <- "rating"
d.melt$question <- factor(d.melt$question, labels=c("How likely is it raining?", "How much evidence?"))
d.summary <- summarySE(d.melt, measurevar=c("rating"), groupvars=c("sentenceType", "question"))

ggplot(d.summary, aes(x=sentenceType, y=rating)) +
  geom_bar(stat="identity", color="black", fill="grey") +
  geom_errorbar(aes(ymin=rating-ci, ymax=rating+ci), width=0.2) +
  facet_grid(.~question) +
  theme_bw()

# By subject

ggplot(d.melt, aes(x=sentenceType, y=rating, color=question)) +
  #geom_point() +
  geom_text(aes(label=order)) +
  geom_line(aes(group=question)) +
  facet_wrap(~workerID, ncol=6) + 
  theme_bw()

# By order
# Identify subjects for whom the "must" precedes "bare"
d.must <- subset(d.melt, sentenceType=="must")
colnames(d.must)[6] <- "must.order"
d.bare <- subset(d.melt, sentenceType=="bare")
colnames(d.bare)[6] <- "bare.order"
d.order <- join(d.must, d.bare, by=c("workerID", "gender", "age", "income", "language", "question"))
d.order$must.before <- ifelse(d.order$must.order < d.order$bare.order, "mustFirst", "bareFirst")
d.order <- data.frame(workerID=d.order$workerID, must.before=d.order$must.before)

d.melt <- join(d.melt, d.order, by=c("workerID"))
d.order.summary <- summarySE(d.melt, measurevar="rating", groupvars=c("sentenceType", "question", "must.before"))

ggplot(d.order.summary, aes(x=sentenceType, y=rating)) +
  geom_bar(stat="identity", color="black", fill="grey") +
  geom_errorbar(aes(ymin=rating-ci, ymax=rating+ci), width=0.2) +
  facet_grid(question~must.before) +
  theme_bw()
