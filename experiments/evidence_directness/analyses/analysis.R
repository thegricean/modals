library(ggplot2)
library(reshape2)
library(plyr)
source("~/Dropbox/Work/Grad_school/Research/Utilities/summarySE.R")

d <- read.csv("../data/long2.csv")
d$domain <- factor(d$domain)
d$evidence <- factor(d$evidence)
d.summary <- summarySE(d, measure="prob", groupvars=c("evidence", "domain"))
d.summary <- d.summary[with(d.summary, order(domain, -prob)), ]
p <- ggplot(d.summary, aes(x=evidence, y=prob)) +
  geom_bar(stat="identity", color="black", fill="grey") +
  geom_errorbar(aes(ymin=prob-ci, ymax=prob+ci)) +
  facet_grid(domain~.) +
  theme_bw() +
  theme(axis.text.x = element_text(angle=90, vjust=1, hjust=1))

ggsave("plot.pdf", p, height=30, width=8)
  
write.csv(d.summary, "../data/summary2.csv")

ggplot(subset(d, domain=="rain"), aes(x=prob)) +
  geom_histogram(binwidth=0.2) +
  facet_grid(evidence~.) +
  theme_bw()

