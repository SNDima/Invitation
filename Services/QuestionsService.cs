using System.Collections.Generic;
using Repositories;

namespace Services
{
    public class Question
    {
        public string Str { get; set; }
        public int TimeToAnswer { get; set; }
    }

    public class QuestionsService
    {
        public Question GetQuestion()
        {
            var question = StaticRepository.GetQuestion();
            return new Question()
            {
                Str = question.Str,
                TimeToAnswer = question.TimeToAnswer
            };
        }
    }
}
