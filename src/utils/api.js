import WebHelper from './web';

const ApiRoot = 'https://api.freenom.com/v2/'

const ApiList = {
	'service/ping': {
		method: 'GET',
		description: 'This function allows the user to check the status of the server. The server will return its latest timestamp.',
	},
	'domain/search': {
		method: 'GET',
		description: 'This function allows the API user to search a domain for availability.',
	},
	'domain/register': {
		method: 'POST',
		description: 'Use this function to register a domain.',
	},
	'domain/renew': {
		method: 'POST',
		descrption: 'This function must be used to renew a domain registration.',
	},
	'domain/getinfo': {
		method: 'GET',
		description: 'Retrieve information about a domain registered by the requesting user.',
	},
	'domain/modify': {
		method: 'PUT',
		description: 'If a domain\'s DNS settings or URL forwarding is to be updated, this function will offer functionality for that.',
	},
	'domain/delete': {
		method: 'DELETE',
		description: 'This function will delete the domain from the account. The domain name will immediately be available to other registrants once it has been cancelled.',
	},
	'domain/restore': {
		method: 'POST',
		description: 'This function will restore a domain to the account if possible.',
	},
	'domain/upgrade': {
		method: 'POST',
		description: 'Upgrade a free domain to paid domain.',
	},
	'domain/list': {
		method: 'GET',
		description: 'Lists all domains under the account.',
	},
	'nameserver/register': {
		method: 'PUT',
		description: 'When the domain\'s DNS is managed by custom nameservers and the nameservers are under the domain, nameserver glue records are required to get the domain working. Nameserver glue records can be registered using this function.'
	},
	'nameserver/delete': {
		method: 'DELETE',
		description: 'Nameserver glue records registered via the nameserver/register method can be deleted via this function. nameservers are under the domain, nameserver glue records are required to get the domain working. Nameserver glue records can be registered using this function.',
	},
	'nameserver/list': {
		method: 'GET',
		description: 'This function is used to retrieve a list of nameserver glue records registered under a domain name.',
	},
	'contact/register': {
		method: 'PUT',
		description: 'Creating a new contact can be done with this function. The contact is not linked to any domain after being created; this needs to be done by new domain registration or modification.',
	},
	'contact/delete': {
		method: 'DELETE',
		description: 'Deleting a new contact can be done with this function. Contacts can only be deleted if they are not linked to any domain.',
	},
	'contact/getinfo': {
		method: 'GET',
		description: 'List details of contacts under user account',
	},
	'contact/list': {
		method: 'GET',
		description: 'List all contacts under users account.',
	},
	'domain/transfer/price': {
		method: 'GET',
		description: 'Transfers are made by gaining partners that use an obtained authorization code from the registrant or the losing partner. All transfers are subject to a one year renewal. Before a transfer is made the gaining partner may request the retail price and partner price of the transfer (and therefore the one year renewal). This API call only provides prices and does not perform the actual transfer.',
	},
	'domain/transfer/request': {
		method: 'POST',
		description: 'Transfer requests are performed by resellers that wish to transfer domain names from other resellers or registrars to their own account.',
	},
	'domain/transfer/approve': {
		method: 'POST',
		description: 'Approve an outgoing domain transfer.',
	},
	'domain/transfer/decline': {
		method: 'POST',
		description: 'Decline an outgoing domain transfer.',
	},
	'domain/transfer/list': {
		method: 'GET',
		description: 'Retrieve a list of domain transfers. Domain transfers that are in final status approved or declined will be listed for a week after the transfer update.',
	}
}

class FreenomApi {
	constructor(props)
	{
		this.root = props.root;
		this.list = props.list;
	}
	request(url, method, data, cookies) {
		url += (method == 'POST') ? '' : ('?' + WebHelper.queryString(data));
		return fetch(url, {
			method: method,
			headers: {
				'Content-Type': (method == 'POST') ? 'application/x-www-form-urlencoded' : '',
				'Cookies': cookies,
			},
			data: (method == 'POST') ? WebHelper.queryString(data) : '',
		});
	}
	callApi(name, params = {}) {
		if(params.data === undefined || params.data === null)
			params.data = {};
		if(params.cookies === undefined || params.cookies === null)
			params.cookies = '';
		return this.request(this.root + name, this.list[name].method, params.data, params.cookies);
	}
}

export default new FreenomApi({
	root: ApiRoot,
	list: ApiList,
});