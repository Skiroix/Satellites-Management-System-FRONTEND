// PRESIDENT
export type President = {
	_id: string;
	fullName: string;
	country: string;
	email: string;
	password: string;
	isRedButton: boolean;
	createdAt: number;
};
export type MaybePresident = Maybe<President>;

// SATELLITE
export type Satellite = {
	_id: string;
	sideNumber: string;
	producent: string;
	model: string;
	version: string;
	launchedAt: string;
	numberOfMissiles: number;
	orbitAltitude: number;
	isAI: boolean;
	builtAt: number;
	createdAt: number;
	updatedAt: number | null;
	ownedBy: string;
};
export type MaybeSatellite = Maybe<Satellite>;

// STORE TYPES & INTERFACES
export type RegisterUserPayload = {
	fullName: string;
	country: string;
	email: string;
	password: string;
	isRedButton: boolean;
};
export type LoginUserPayload = {
	email: string;
	password: string;
};

export type CreateSatellitePayload = {
	sideNumber: string;
	producent: string;
	model: string;
	version: string;
	launchedAt: string;
	numberOfMissiles: number;
	orbitAltitude: number;
	isAI: boolean;
	builtAt: number;
};

export type UpdateSatellitePayload = Maybe<CreateSatellitePayload> & {
	satelliteId: string;
};

// SERVER RESPONSE
export type RegisterUserResponse = {
	status: number;
	message: string;
	token?: string;
	president?: President;
};
export type LoginUserResponse = RegisterUserResponse;

export type CreateSatelliteResponse = {
	status: number;
	message: string;
	satellite?: Satellite;
};

export type UpdateSatelliteResponse = {
	status: number;
	message: string;
	satellite?: Satellite;
};

export type GetSatelliteResponse = UpdateSatelliteResponse;
export type DeleteSatelliteResponse = UpdateSatelliteResponse;

export type GetSatellitesResponse = {
	status: number;
	message: string;
	satellites?: Satellite[];
};

export type ErrorResponse = {
	message: string;
	status: 400 | 401 | 404 | 500;
};

// OTHER
type Maybe<T> = {
	[Property in keyof T]+?: T[Property];
};
