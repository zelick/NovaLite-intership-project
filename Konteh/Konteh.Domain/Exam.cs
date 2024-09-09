﻿namespace Konteh.Domain;

public class Exam
{
    public int Id { get; set; }
    public Candidate Candidate { get; set; } = null!;
    public List<ExamQuestion> ExamQuestions { get; set; } = [];
}
