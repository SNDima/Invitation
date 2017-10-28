using System.Collections.Generic;
using Repositories;

namespace Services
{
    public class Question
    {
        public int Id { get; set; }
        public string Str { get; set; }
        public int TimeToAnswer { get; set; }
    }

    public class AnswerResult
    {
        public bool Succeeded { get; set; }
        public string Message { get; set; }
    }

    public class QuestionsService
    {
        public Question GetQuestion()
        {
            var question = StaticRepository.GetQuestion();
            if (question == null)
            {
                return null;
            }
            return new Question()
            {
                Id = question.Id,
                Str = question.Str,
                TimeToAnswer = question.TimeToAnswer
            };
        }

        public int GetStatus()
        {
            return StaticRepository.GetStatus();
        }

        public void SetStatus(int status)
        {
            StaticRepository.SetStatus(status);
        }

        public void SetQuestionTime(int id, int time)
        {
            StaticRepository.SetQuestionTime(id, time);
        }

        public AnswerResult AnswerQuestion(int id, string answer)
        {
            var result = StaticRepository.AnswerQuestion(id, answer);
            return new AnswerResult
            {
                Succeeded = result.Succeeded,
                Message = result.Message
            };
        }

        public int GetTimer()
        {
            return StaticRepository.Timer;
        }

        public void SetTimer(int time)
        {
            StaticRepository.Timer = time;
        }

        public void Flush()
        {
            StaticRepository.Reinit();
        }
    }
}
