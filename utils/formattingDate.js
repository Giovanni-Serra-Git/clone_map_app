function formattingDate(date) {

  const newDate = new Date(date)
    return new Intl.DateTimeFormat("en", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }).format(newDate);
}

export default formattingDate
