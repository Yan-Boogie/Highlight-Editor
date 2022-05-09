# A4N User FLow Diagram

```mermaid
Mermaid markdown

sequenceDiagram
User ->> NerdTraining Entry Page: /aide, click NERD Training Entry button
NerdTraining Entry Page ->> NerdTraining: Enter article Guid

participant EntitySearch as NerdTraining/EntitySearch
participant Article as NerdTraining/Article
participant Mentions as NerdTraining/Mentions
participant Submit as NerdTraining/Submit

EntitySearch -)+ Backend: Search for Entity List
Backend -)- EntitySearch: Return Entity List result

par Article to Article
    Article ->>+ Article: Hover article text to 'Pink Select' keywords
alt Add new Mention item
    EntitySearch ->> EntitySearch: Click red button of specific Entity item
    EntitySearch ->> Mentions: Either add the entity with 'Pink Selected' to Mentions as 'COMPANY' or 'PRODUCT'
else Adjust exist Mention Item
    Mentions ->> Mentions: Click add button beside Mention item to add keywords
    deactivate Article
end
end

par Mentions to Mentions
    Mentions ->>+ Mentions: Click Mention item starting editting 'Highlighted Text'
and Article to Mentions
    Article ->> Mentions: Click 'Highlighted Text' to remove it from Mention Item
and Mentions to Mentions
    Mentions -->- Mentions: Click item again or remove the whole item to finish editting
end

Submit -)+ Backend: Submit changes
Backend -)- NerdTraining: Return submit status result
```
