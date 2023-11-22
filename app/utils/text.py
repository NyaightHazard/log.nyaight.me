import re
import unicodedata
from secrets import token_hex

def slugify(text: str) -> str:
    #!MOD use ASCII flag for non-ASCII character in article title
    value = unicodedata.normalize("NFKC", text)
    value = re.sub(r"(?a)\W+", "-", value.lower())
    return value.strip("_-") or ("post-"+token_hex(8))
