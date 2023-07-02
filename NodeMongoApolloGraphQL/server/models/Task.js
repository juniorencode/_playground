import { Schema, model } from 'mongoose';

const taskSchema = new Schema({
  title: { type: String, required: true },
  projectId: { type: Schema.Types.ObjectId, ref: 'Project', required: true }
});

export default model('Task', taskSchema);
