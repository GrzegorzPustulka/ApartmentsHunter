from typing import Any


def matches_query(record: dict[str, Any], query: dict[str, Any]):
    for key, condition in query.items():
        if key not in record:
            return False

        if isinstance(condition, dict):
            for operator, value in condition.items():
                if operator == "$lte" and not record[key] <= value:
                    return False
                elif operator == "$gte" and not record[key] >= value:
                    return False
                elif operator == "$eq" and not record[key] == value:
                    return False
                elif operator == "$in" and not record[key] in value:
                    return False
        else:
            if record[key] != condition:
                return False

    return True
