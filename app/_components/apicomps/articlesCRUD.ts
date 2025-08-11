import { ArticleInterface } from "@/app/_types/interfaces";

type RawArticle = {
    post_id: number;
    title: string;
    created_at: string;
    content: string;
    image: string;
    summary: string;
    is_featured: string;
};

const articlesAPI = {
    getArticles: async (): Promise<ArticleInterface[]> => {
        try {
            const response = await fetch("/api/articles");
            if (!response.ok) {
                const errorData: { message: string } = await response.json();
                throw new Error(errorData.message || "Failed to load articles");
            }

            const raw: RawArticle[] = await response.json();

            return raw.map((article) => ({
                post_id: article.post_id,
                title: article.title,
                created_at: article.created_at,
                content: article.content,
                image: article.image,
                summary: article.summary,
                is_featured: article.is_featured === "1",
            }));
        } catch (err) {
            console.error("Error in getArticles:", err);
            throw err;
        }
    },

    createArticle: async (
        newArticle: Omit<ArticleInterface, "id" | "date">
    ): Promise<ArticleInterface> => {
        try {
            const response = await fetch("/api/articles", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userId: 1, // TEMP: replace with actual user
                    title: newArticle.title,
                    content: newArticle.content,
                    summary: newArticle.summary,
                    image: newArticle.imgLink,
                    is_featured: newArticle.featured ? 1 : 0,
                }),
            });

            if (!response.ok) {
                const errorData: { message: string } = await response.json();
                throw new Error(errorData.message || "Failed to create article");
            }

            const created = await response.json();
            const article = created.article;

            return {
                id: article.post_id,
                title: article.title,
                date: article.created_at,
                content: article.content,
                imgLink: article.image,
                summary: article.summary,
                featured: article.is_featured === "1",
            };
        } catch (err) {
            console.error("Error in createArticle:", err);
            throw err;
        }
    },

    updateArticle: async (
        id: number,
        updatedFields: Partial<ArticleInterface>
    ): Promise<void> => {
        try {
            const payload: {
                title?: string;
                content?: string;
                summary?: string;
                image?: string;
                is_featured?: number;
            } = {
                ...(updatedFields.title && { title: updatedFields.title }),
                ...(updatedFields.content && { content: updatedFields.content }),
                ...(updatedFields.summary && { summary: updatedFields.summary }),
                ...(updatedFields.imgLink && { image: updatedFields.imgLink }),
                ...(updatedFields.featured !== undefined && {
                    is_featured: updatedFields.featured ? 1 : 0,
                }),
            };

            const response = await fetch(`/api/articles/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to update article");
            }
        } catch (err) {
            console.error("Error in updateArticle:", err);
            throw err;
        }
    },

    deleteArticle: async (id: number): Promise<void> => {
        try {
            const response = await fetch(`/api/articles/${id}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to delete article");
            }
        } catch (err) {
            console.error("Error in deleteArticle:", err);
            throw err;
        }
    },
};

export default articlesAPI;
