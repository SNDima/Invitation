using System.Collections.Generic;
using System.Linq;

namespace Repositories
{
    public class Question
    {
        public int Id { get; set; }
        public string Str { get; set; }
        public int TimeToAnswer { get; set; }
        public string RightAnswer { get; set; }
        public Dictionary<string,string> CustomMessagesToAnswers { get; set; }
        public bool IsTaken { get; set; }
    }

    public enum Status
    {
        Initial = 1,
        HelloShown = 2,
        YesSelected = 3
    }

    public static class StaticRepository
    {
        private static Question[] Questions = new Question[]
        {
            new Question()
            {
                Id = 1,
                Str = "To varify yourself please type the last word from your VK status",
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
                TimeToAnswer = 45,
                RightAnswer = "bosco",
                CustomMessagesToAnswers = new Dictionary<string, string>()
            }
        };

        private static Status Status = Status.Initial;

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
                question.IsTaken = true;
            }
        }
    }
}
