import { startSession } from "mongoose";
import { NoteModel } from "../../data/mongodb/models/notes.model";
import { CreateNoteDto, CustomError } from "../../domain";

export class NoteService {
  async createNote(createNoteDto: CreateNoteDto, task: any, user: any) {
    const { content } = createNoteDto

    const session = await startSession();
    try {
      session.startTransaction();
      const note = new NoteModel(createNoteDto);
      note.content = content;
      note.createdBy = user.id;
      note.task = task.id;

      task.notes.push(note.id);

      await note.save({ session });
      await task.save({ session });

      await session.commitTransaction();
      session.endSession();

      return 'Nota Creada Correctamente';

    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }

  async getNotesByTask(task: any) {
    try {
      const notes = await NoteModel.find({ task: task.id });
      return notes;
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }

}
