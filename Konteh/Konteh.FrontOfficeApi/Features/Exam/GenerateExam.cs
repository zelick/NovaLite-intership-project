namespace Konteh.FrontOfficeApi.Features.Exam;

using Konteh.Domain;
using Konteh.Infrastructure.Repositories;
using MediatR;

public static class GenerateExam
{
    public class Query : IRequest<Response>
    {
        public string Name { get; set; } = string.Empty;
        public string Surname { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
    }

    public class Response
    {
        public int Id { get; set; }
        public List<ExamQuestion> ExamQuestions { get; set; } = [];
    }

    public class RequestHandler : IRequestHandler<Query, Response>
    {
        private readonly IRepository<Question> _questionRepository;
        private readonly IRepository<ExamQuestion> _examQuestionRepository;
        private readonly IRepository<Exam> _examRepository;
        private readonly IRepository<Candidate> _candidateRepository;
        private readonly IRandomNumberGenerator _random;

        public RequestHandler(IRepository<Question> questionRepository, IRepository<ExamQuestion> examQuestionRepository,
                              IRepository<Exam> examRepository, IRepository<Candidate> candidateRepository,
                              IRandomNumberGenerator random)
        {
            _questionRepository = questionRepository;
            _examQuestionRepository = examQuestionRepository;
            _examRepository = examRepository;
            _candidateRepository = candidateRepository;
            _random = random;
        }
        public async Task<Response> Handle(Query request, CancellationToken cancellationToken)
        {
            var candidate = await CheckIfCandidateHasTakenTest(request);

            //TODO: Load info on number of questions
            int numberOfQuestionsPerCategory = 2;
            List<Question> questions = await GetQuestionsForExam(numberOfQuestionsPerCategory);

            var exam = new Exam
            {
                Candidate = candidate,
                ExamQuestions = new List<ExamQuestion>()
            };

            foreach (var question in questions)
            {
                var examQuestion = new ExamQuestion
                {
                    Question = question,
                    SelectedAnswers = new List<Answer>()
                };

                exam.ExamQuestions.Add(examQuestion);

                _examQuestionRepository.Add(examQuestion);
            }

            _examRepository.Add(exam);
            await _examRepository.SaveChanges();

            return new Response
            {
                Id = exam.Id,
                ExamQuestions = exam.ExamQuestions
            };
        }

        private async Task<Candidate> CheckIfCandidateHasTakenTest(Query request)
        {
            var existingExam = _examRepository.Search(e => e.Candidate.Email == request.Email).ToList();

            if (existingExam.Any())
            {
                throw new InvalidOperationException("Candidate has already taken the test.");
            }

            var candidate = new Candidate
            {
                Email = request.Email,
                Name = request.Name,
                Surname = request.Surname
            };

            _candidateRepository.Add(candidate);

            return candidate;
        }

        private async Task<List<Question>> GetQuestionsForExam(int numberOfQuestionsPerCategory)
        {
            var categories = Enum.GetValues(typeof(QuestionCategory)).Cast<QuestionCategory>();
            var allQuestions = await _questionRepository.GetAll();
            var questions = new List<Question>();

            foreach (var category in categories)
            {
                var randomQuestionsPerCategory = new List<Question>();
                var allQuestionsFromCategory = allQuestions
                    .Where(x => x.Category == category)
                    .ToList();

                if (numberOfQuestionsPerCategory > allQuestionsFromCategory.Count())
                {
                    throw new InvalidOperationException($"Not enough questions in {category} category.");
                }

                for (int i = 0; i < numberOfQuestionsPerCategory; i++)
                {
                    var randomQuestion = allQuestionsFromCategory[_random.Next(0, allQuestionsFromCategory.Count)];
                    allQuestionsFromCategory.Remove(randomQuestion);
                    randomQuestionsPerCategory.Add(randomQuestion);
                }

                questions.AddRange(randomQuestionsPerCategory);
            }

            return questions;
        }

    }

}

