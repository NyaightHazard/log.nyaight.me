import re
import unicodedata
from secrets import token_hex

def slugify(text: str) -> str:
    #!FIX use ASCII flag for non-ASCII character in article title
    value = unicodedata.normalize("NFKC", text)
    value = re.sub(r"(?a)[^\w\s-]", "", value.lower())
    return re.sub(r"(?a)[-\s]+", "-", value).strip("-_") or ("post-"+token_hex(8))
