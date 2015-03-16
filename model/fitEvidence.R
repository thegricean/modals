e.human <- read.csv("evidence_given_utterance_human.csv", header=FALSE)
colnames(e.human) <- c("utterance", "evidence", "prop")


r.tables <- data.frame(modelName=NULL, r = NULL)
f.names <- read.csv("model_fits_outputs_parsed/filenames.txt", header=FALSE)
for (name in f.names$V1) {
  model <- read.csv(paste("model_fits_outputs_parsed/", name, sep=""))
  comp <- join(model, e.human, by=c("utterance", "evidence"))
  cor <- with(comp, cor(prop, probability))
  r.table <- data.frame(modelName=name, r=cor)
  r.tables <- rbind(r.tables, r.table)
}

ggplot(r.tables, aes(x=r)) +
  geom_histogram() +
  theme_bw()

r.tables <- r.tables[with(r.tables, order(-r, modelName)), ]
best.model <- as.character(r.tables[1,1])

model <- read.csv(paste("model_fits_outputs_parsed/", "0.5_0.4_0.1_3.church", sep=""))

model$utterance <- factor(model$utterance, levels=c("bare", "must", "might"))
model$evidence <- factor(model$evidence, levels=c("strong", "medium", "weak"))
ggplot(model, aes(x=evidence, y=probability)) +
  geom_bar(stat="identity", color="black", fill="gray") +
  theme_bw() +
  facet_grid(.~utterance) +
  scale_fill_manual(values=c("#023858", "#1d91c0", "#7fcdbb", "#ffffcc"), name="Evidence type") +
  xlab("Evidence type") +
  ylab("Probability")