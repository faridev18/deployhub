import os
from typing import List, Any, Dict
from pydantic import model_validator
from pydantic_settings import BaseSettings
from dotenv import load_dotenv

load_dotenv()


class Settings(BaseSettings):
    PROJECT_NAME: str = "DeployHub API"
    VERSION: str = "1.0.0"

    SECRET_KEY: str = "change-me-please-use-a-long-random-string"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 1440

    DATABASE_URL: str = "sqlite:///./deployhub.db"

    BACKEND_CORS_ORIGINS: List[str] = ["http://localhost:5173", "http://127.0.0.1:5173"]

    @model_validator(mode="before")
    @classmethod
    def parse_cors_origins(cls, values: Dict[str, Any]) -> Dict[str, Any]:
        v = values.get("BACKEND_CORS_ORIGINS")
        if isinstance(v, str):
            values["BACKEND_CORS_ORIGINS"] = [
                item.strip() for item in v.split(",") if item.strip()
            ]
        return values

    DEPLOY_HOST: str = os.getenv("DEPLOY_HOST", "localhost")
    DEPLOY_PORT_RANGE_START: int = int(os.getenv("DEPLOY_PORT_RANGE_START", "8090"))
    DEPLOY_PORT_RANGE_END: int = int(os.getenv("DEPLOY_PORT_RANGE_END", "9000"))

    EMAIL_ENABLED: bool = os.getenv("EMAIL_ENABLED", "false").lower() == "true"
    FRONTEND_URL: str = os.getenv("FRONTEND_URL", "http://localhost:5173")

    class Config:
        case_sensitive = True


settings = Settings()

