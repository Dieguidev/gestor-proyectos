import { Request, Response } from "express";
import { CreateNoteDto, CustomError } from "../../domain";
import { NoteService } from "../services/note.service";
import { INote } from '../../data/mongodb/models/notes.model';

export class NoteController {
  constructor(
    private readonly noteService: NoteService
  ) { }

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message })
    }

    console.log(`${error}`);

    return res.status(500).json({ error: 'Internal Server Error' })
  }

  createNote = (req: Request<{}, {}, INote>, res: Response) => {
    const [error, createNoteDto] = CreateNoteDto.create(req.body)
    if (error) return res.status(400).json({ error })

    this.noteService.createNote(createNoteDto!)
      .then(note => res.json(note))
      .catch(error => this.handleError(error, res));
  }
}
