"use client";

import { useEffect, useMemo, useState } from "react";

const habits = [
  { name: "Убраться в комнате", icon: "✦", color: "#ff8a65" },
  { name: "Читать 1 час", icon: "◒", color: "#7c6cf2" },
  { name: "Заниматься jconf", icon: "⌁", color: "#2db6a3" },
  { name: "Сделать домашку", icon: "✎", color: "#f3ae3d" },
  { name: "100 отжиманий", icon: "⚡", color: "#ed5f76" },
];

const days = Array.from({ length: 31 }, (_, index) => index + 1);
const weekday = ["СБ", "ВС", "ПН", "ВТ", "СР", "ЧТ", "ПТ"];
const key = "habit-tracker-august-2026";
const booksKey = "habit-tracker-books";

export default function Home() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [burst, setBurst] = useState("");
  const [books, setBooks] = useState<string[]>([""]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      setChecked(JSON.parse(localStorage.getItem(key) || "{}"));
      const savedBooks = JSON.parse(localStorage.getItem(booksKey) || "null");
      if (Array.isArray(savedBooks) && savedBooks.length) setBooks(savedBooks);
    } catch {}
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) localStorage.setItem(key, JSON.stringify(checked));
  }, [checked, loaded]);

  useEffect(() => {
    if (loaded) localStorage.setItem(booksKey, JSON.stringify(books));
  }, [books, loaded]);

  const total = Object.values(checked).filter(Boolean).length;
  const possible = days.length * habits.length;
  const percent = Math.round((total / possible) * 100);
  const todayDone = habits.filter((_, h) => checked[`1-${h}`]).length;

  const habitTotals = useMemo(
    () => habits.map((_, h) => days.filter((day) => checked[`${day}-${h}`]).length),
    [checked],
  );

  function toggle(day: number, habit: number) {
    const id = `${day}-${habit}`;
    const next = !checked[id];
    setChecked((current) => ({ ...current, [id]: next }));
    if (next) {
      setBurst(id);
      window.setTimeout(() => setBurst(""), 650);
    }
  }

  return (
    <main>
      <header className="hero">
        <div className="eyebrow"><span /> МОЙ РИТМ · АВГУСТ 2026</div>
        <div className="heroRow">
          <div>
            <h1>Маленькие шаги.<br /><em>Большой результат.</em></h1>
            <p>Отмечай выполненное каждый день. Всё сохраняется автоматически.</p>
          </div>
          <div className="ring" style={{ "--p": `${percent * 3.6}deg` } as React.CSSProperties}>
            <div><strong>{percent}%</strong><span>за месяц</span></div>
          </div>
        </div>
        <div className="stats">
          <div><span>Выполнено</span><strong>{total}<small> / {possible}</small></strong></div>
          <div><span>Сегодня</span><strong>{todayDone}<small> / 5</small></strong></div>
          <div><span>Серия</span><strong>{total ? "1" : "0"}<small> день</small></strong></div>
          <div className="quote">Не стремись к идеалу.<br /><b>Просто не останавливайся.</b></div>
        </div>
      </header>

      <section className="content">
        <div className="sectionHead">
          <div><span className="sectionNum">01</span><h2>Трекер привычек</h2></div>
          <div className="legend"><i /> выполнено <span /> контрольный день</div>
        </div>

        <div className="tableWrap">
          <table>
            <thead>
              <tr>
                <th className="dateCell">ДАТА</th>
                {habits.map((habit, i) => (
                  <th key={habit.name}>
                    <span className="habitIcon" style={{ background: habit.color }}>{habit.icon}</span>
                    <span>{habit.name}</span>
                    <small>{habitTotals[i]} / 31</small>
                  </th>
                ))}
                <th>ДЕНЬ</th>
              </tr>
            </thead>
            <tbody>
              {days.map((day) => {
                const milestone = [10, 20, 30].includes(day);
                const done = habits.filter((_, h) => checked[`${day}-${h}`]).length;
                return (
                  <tr key={day} className={milestone ? "milestone" : ""}>
                    <td className="dateCell"><strong>{String(day).padStart(2, "0")}</strong><span>{weekday[day - 1]}</span></td>
                    {habits.map((habit, h) => {
                      const id = `${day}-${h}`;
                      return (
                        <td key={id}>
                          <button
                            className={`check ${checked[id] ? "active" : ""} ${burst === id ? "burst" : ""}`}
                            onClick={() => toggle(day, h)}
                            aria-label={`${habit.name}, ${day} августа`}
                            aria-pressed={Boolean(checked[id])}
                            style={{ "--accent": habit.color } as React.CSSProperties}
                          >
                            <span>✓</span>
                            {burst === id && <b className="sparkles">✦ <i>•</i> ✦</b>}
                          </button>
                        </td>
                      );
                    })}
                    <td><span className="daily">{done}/5</span></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="footnote">Контрольные точки: 10, 20 и 30 августа · Продолжай в своём темпе</p>

        <section className="books">
          <div className="sectionHead bookHead">
            <div><span className="sectionNum">02</span><h2>Мои книги</h2></div>
            <button className="addBook" onClick={() => setBooks((current) => [...current, ""])}>
              <span>＋</span> Добавить книгу
            </button>
          </div>
          <div className="bookGrid">
            {books.map((book, index) => (
              <article className="bookCard" key={index}>
                <div className="bookNumber">{String(index + 1).padStart(2, "0")}</div>
                <div className="bookMark">◒</div>
                <label htmlFor={`book-${index}`}>Название книги</label>
                <input
                  id={`book-${index}`}
                  value={book}
                  onChange={(event) =>
                    setBooks((current) =>
                      current.map((title, bookIndex) => bookIndex === index ? event.target.value : title),
                    )
                  }
                  placeholder="Например, «Маленький принц»"
                  maxLength={120}
                />
                <span className="savedHint">{book.trim() ? "Сохранено автоматически" : "Впиши свою книгу"}</span>
                {books.length > 1 && (
                  <button
                    className="removeBook"
                    onClick={() => setBooks((current) => current.filter((_, bookIndex) => bookIndex !== index))}
                    aria-label={`Удалить книгу ${index + 1}`}
                  >
                    Удалить
                  </button>
                )}
              </article>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
