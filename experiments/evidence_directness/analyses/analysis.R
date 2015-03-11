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

######################################################
# split evidence into 3 groups based on mean strength
#####################################################

d.summary$bin <- as.numeric(cut(d.summary$prob, 3))
colnames(d.summary)[4] <- "meanProb"
d <- join(d, d.summary, by=c("evidence", "domain"))

# plot distributions

ggplot(d, aes(x=prob)) +
  geom_histogram(binwidth=0.2) +
  facet_grid(bin~.) +
  theme_bw()

# compute histogram for weak, moderate, and strong evidence

weak.dist <- hist(subset(d, bin==1)$prob, breaks=seq(0, 1, by=0.2))
weak.dist$prob <- weak.dist$counts / sum(weak.dist$counts)

mod.dist <- hist(subset(d, bin==2)$prob, breaks=seq(0, 1, by=0.2))
mod.dist$prob <- mod.dist$counts / sum(mod.dist$counts)

strong.dist <- hist(subset(d, bin==3)$prob, breaks=seq(0, 1, by=0.2))
strong.dist$prob <- strong.dist$counts / sum(strong.dist$counts)
