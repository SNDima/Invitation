using System.Collections.Generic;
using System.Globalization;
using System.Linq;

namespace Repositories
{
    public class Question
    {
        public int Id { get; set; }
        public string Str { get; set; }
        public int InitialTimeToAnswer { get; set; }
        public int TimeToAnswer { get; set; }
        public string RightAnswer { get; set; }
        public Dictionary<string,string> CustomMessagesToAnswers { get; set; }
        public bool IsTaken { get; set; }
    }

    public class AnswerResult
    {
        public bool Succeeded { get; set; }
        public string Message { get; set; }
    }

    public enum Status
    {
        Initial = 1,
        HelloShown = 2,
        YesSelected = 3,
        Answered = 4,
        Waiting = 5,
        BeforeReady = 6,
        AfterDecision = 7
    }

    public static class StaticRepository
    {
        private static Question[] Questions = new Question[]
        {
            new Question()
            {
                Id = 1,
                Str = "To varify yourself please type the last word from your VK status",
                InitialTimeToAnswer = 30,
                TimeToAnswer = 30,
                RightAnswer = "свет",
                CustomMessagesToAnswers = new Dictionary<string, string>()
                {
                    {"light", "Ой, кажется, у меня есть небольшие трудности с английским. "
                        + "Немогли бы Вы ввести русский перевод слова light." }
                }
            },
            new Question()
            {
                Id = 2,
                Str = "It seems that you like Placebo band... Hmmm... I like one song which has next words "
                + "'And when I get drunk, you take me home. And keep me safe from harm...' "
                + "But I've forgotten the song name. Maybe you can remind me it?",
                InitialTimeToAnswer = 45,
                TimeToAnswer = 45,
                RightAnswer = "bosco",
                CustomMessagesToAnswers = new Dictionary<string, string>()
            },
            new Question()
            {
                Id = 3,
                Str = "This queston is very simple. Please type in Russian the last name of a professor who taught us C and C++?",
                InitialTimeToAnswer = 30,
                TimeToAnswer = 30,
                RightAnswer = "белодед",
                CustomMessagesToAnswers = new Dictionary<string, string>()
            },
            new Question()
            {
                Id = 4,
                Str = "And this question is just the last chance to come in. I don't know what to ask... Type something?",
                InitialTimeToAnswer = 30,
                TimeToAnswer = 30,
                RightAnswer = "something",
                CustomMessagesToAnswers = new Dictionary<string, string>()
            }
        };

        private static Status Status = Status.Initial;

        public const int TimerValue = 300; // 5 minutes
        public static int Timer = TimerValue;

        private static string Decision;

        public static bool IsPhoneEnabled;

        public static void Reinit()
        {
            Status = Status.Initial;
            foreach (var question in Questions)
            {
                question.IsTaken = false;
                question.TimeToAnswer = question.InitialTimeToAnswer;
            }
            Timer = TimerValue;
        }

        public static Question GetQuestion()
        {
            foreach (var question in Questions)
            {
                if (!question.IsTaken)
                {
                    return question;
                }
            }
            return null;
        }

        public static int GetStatus()
        {
            return (int)Status;
        }

        public static void SetStatus(int status)
        {
            Status = (Status)status;
        }

        public static void SetQuestionTime(int id, int time)
        {
            var question = Questions.FirstOrDefault(q => q.Id == id);
            question.TimeToAnswer = time;
            if (time == 0)
            {
                Status = Status.Waiting;
                question.IsTaken = true;
            }
        }

        public static AnswerResult AnswerQuestion(int id, string answer)
        {
            var question = Questions.FirstOrDefault(q => q.Id == id);
            if (answer != null && answer.ToLower().Trim() == question.RightAnswer)
            {
                Status = Status.Answered;
                return new AnswerResult
                {
                    Succeeded = true,
                    Message = "Great job! Hello, Vera :)"
                };
            }
            else if (answer != null && question.CustomMessagesToAnswers.ContainsKey(answer.ToLower().Trim()))
            {
                return new AnswerResult
                {
                    Succeeded = false,
                    Message = question.CustomMessagesToAnswers[answer.ToLower().Trim()]
                };
            }
            else
            {
                return new AnswerResult
                {
                    Succeeded = false,
                    Message = "Wrong answer. Please try again."
                };
            }
        }

        public static void MakeDecision(string decision)
        {
            Decision = decision;
            Status = Status.AfterDecision;
        }
    }
}
