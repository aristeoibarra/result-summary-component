(async () => {
  const data = await fetch("data.json").then((res) => res.json());

  const totalScorePercent = Math.round(
    data?.reduce((acc, obj) => acc + obj.score, 0) / data.length
  );

  const $summaryTemplate = document.querySelector("#summary-template");
  const $summaryContainer = document.querySelector("#summary-container");

  const $resultTemplate = document.querySelector("#result-template");
  const $resultContainer = document.querySelector("#result-container");

  data.forEach((item) => {
    const $summaryTemplateClone = $summaryTemplate.content.cloneNode(true);

    const $containerItem = $summaryTemplateClone.querySelector(
      ".card__right-summary-item"
    );
    const $category = $summaryTemplateClone.querySelector(
      ".card__right-summary-item-name"
    );
    const $icon = $summaryTemplateClone.querySelector(
      ".card__right-summary-item-icon"
    );
    const $value = $summaryTemplateClone.querySelector(
      ".card__right-summary-item-result-value"
    );

    $containerItem.classList.add(`card__right-summary-item--${item.color}`);
    $category.classList.add(`card__right-summary-item-name--${item.color}`);
    $category.textContent = item.name;
    $icon.src = item.icon;
    $icon.alt = `${item.name} icon`;
    $value.textContent = item.score;

    $summaryContainer.appendChild($summaryTemplateClone);
  });

  const $resultTemplateClone = $resultTemplate.content.cloneNode(true);

  const $total = $resultTemplateClone.querySelector(
    ".card__left-circle-number"
  );
  const $title = $resultTemplateClone.querySelector(".card__left-info-title");
  const $message = $resultTemplateClone.querySelector(
    ".card__left-info-message"
  );

  if (totalScorePercent >= 90) {
    $title.textContent = "Excellent";
  } else if (totalScorePercent >= 75) {
    $title.textContent = "Great";
  } else if (totalScorePercent >= 65) {
    $title.textContent = "Good";
  } else if (totalScorePercent >= 50) {
    $title.textContent = "Fair";
  } else {
    $title.textContent = "Poor";
  }

  $message.textContent =
    "Your performance exceed 65% of the people conducting the test here!";

  $total.textContent = totalScorePercent;

  $resultContainer.appendChild($resultTemplateClone);
})();
