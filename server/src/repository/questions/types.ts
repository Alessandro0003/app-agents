export namespace GetQuestions {
  export type Args = {
    roomId: string;
    limit?: number;
  }

  export type Response = {
    id: string;
    question: string;
    answer: string | null;
    createdAt: Date;
  }[]
}

export namespace CreateQuestion {
	export type Args = {
		roomId: string;
		question: string;
		answer?: string;
	};
}

export namespace GetByQuestionId {
	export type Args = {
		id: string;
	};

	export type Response = {
		id: string;
	};
}

export namespace DeleteQuestion {
	export type Args = {
		id: string;
	};
}