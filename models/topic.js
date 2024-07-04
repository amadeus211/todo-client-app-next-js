import mongoose, { Schema } from "mongoose";

const topicSchema = new Schema({
  title: String,
  description: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'clients', required: true },
}, {
  timestamps: true,
});

const Topic = mongoose.models.Topic || mongoose.model("Topic", topicSchema);

export default Topic;
